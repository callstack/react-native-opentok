#import <Foundation/Foundation.h>
#import "RNOpenTokPublisherView.h"
#import "RNOpenTokScreenSharingCapturer.h"

@interface RNOpenTokPublisherView () <OTPublisherDelegate>
@end

@implementation RNOpenTokPublisherView  {
    OTPublisher* _publisher;
    RCTUIManager* _uiManager;
}

@synthesize sessionId = _sessionId;
@synthesize session = _session;

- (instancetype)initWithUIManager:(RCTUIManager*)uiManager {
    self = [super init];
    _uiManager = uiManager;
    return self;
}

- (void)didMoveToWindow {
    [super didMoveToSuperview];
    [self mount];
}

- (void)dealloc {
    [self stopObserveSession];
    [self stopObserveConnection];
    [self stopPublishing];
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps {
    if (_publisher == nil) {
        return;
    }
    
    if ([changedProps containsObject:@"mute"]) {
        _publisher.publishAudio = !_mute;
    }
    
    if ([changedProps containsObject:@"video"]) {
        _publisher.publishVideo = _video;
    }
    
    if ([changedProps containsObject:@"camera"] && _camera > 0) {
        _publisher.cameraPosition = [self getCameraPosition];
    }
}

#pragma mark - Private methods

- (void)mount {
    [self observeSession];
    [self observeConnection];
    if (!_session) {
        [self connectToSession];
    }
    if(_session.sessionConnectionStatus == OTSessionConnectionStatusConnected && _publisher == nil) {
        [self startPublishing];
    }
}

- (NSInteger)getCameraPosition {
    return _publisher.cameraPosition == AVCaptureDevicePositionBack
        ? AVCaptureDevicePositionFront
        : AVCaptureDevicePositionBack;
}

- (void)startPublishing {
    _publisher = [[OTPublisher alloc] initWithDelegate:self];
    _publisher.publishAudio = !_mute;
    _publisher.publishVideo = _video;
    
    if (_screenCapture) {
        int rootTag = 1;
//        if(_screenCaptureSettings && _screenCaptureSettings[@"rootTag"]) {
//            rootTag = _screenCaptureSettings[@"rootTag"];
//        }
        UIView* screenCaptureView = [_uiManager viewForNativeID:@"RN_OPENTOK_SCREEN_CAPTURE_VIEW"
                                                    withRootTag:[NSNumber numberWithInt:rootTag]];
        
        RNOpenTokScreenSharingCapturer* capture = [[RNOpenTokScreenSharingCapturer alloc]
                                                   initWithView:screenCaptureView];
        
        [_publisher setVideoType:OTPublisherKitVideoTypeScreen];
        [_publisher setVideoCapture:capture];
    } else {
        _publisher.cameraPosition = AVCaptureDevicePositionFront;
    }
   
    
    OTError *error = nil;
    
    [_session publish:_publisher error:&error];
    
    if (error) {
        [self publisher:_publisher didFailWithError:error];
        return;
    }
    
    [self attachPublisherView];
}

- (void)stopPublishing {
    OTError *error = nil;
    
    [_session unpublish:_publisher error:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
    [self cleanupPublisher];
}

- (void)attachPublisherView {
    [_publisher.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_publisher.view];
}

- (void)cleanupPublisher {
    [_publisher.view removeFromSuperview];
    _publisher.delegate = nil;
    _publisher = nil;
}

- (void)onSessionConnect {
    [self startPublishing];
}

- (void)observeConnection {
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(onSessionConnect)
     name:[@"session-did-connect:" stringByAppendingString:_sessionId]
     object:nil];
}

- (void)stopObserveConnection {
    [[NSNotificationCenter defaultCenter]
     removeObserver:self
     name:[@"session-did-connect:" stringByAppendingString:_sessionId]
     object:nil];
}

#pragma mark - OTPublisher delegate callbacks

- (void)publisher:(OTPublisherKit*)publisher streamCreated:(OTStream *)stream {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onPublishStart"
     object:nil
     userInfo:@{@"sessionId": _sessionId, @"streamId": stream.streamId}];
}

- (void)publisher:(OTPublisherKit*)publisher streamDestroyed:(OTStream *)stream {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onPublishStop"
     object:nil
     userInfo:@{@"sessionId": _sessionId, @"streamId": stream.streamId}];
    [self cleanupPublisher];
}

- (void)publisher:(OTPublisherKit*)publisher didFailWithError:(OTError*)error {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onPublishError"
     object:nil
     userInfo:@{@"sessionId": _sessionId, @"error": [error description]}];
    [self cleanupPublisher];
}

@end
