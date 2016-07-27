@import UIKit;
#import "RCTOpenTokPublisherView.h"
#import "RCTEventDispatcher.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokPublisherView () <OTSessionDelegate>

@end

@implementation RCTOpenTokPublisherView {
    BOOL _isMounted;
    OTSession *_session;
    OTPublisher *_publisher;
}

/**
 * Mounts component after all props were passed
 */
- (void)didMoveToWindow {
    [super didMoveToSuperview];
    if (!_isMounted) {
        [self mount];
    }
}

/**
 * Creates a new session with a given apiKey, sessionID and token
 *
 * Calls `onStartFailure` in case an error happens during initial creation.
 *
 * Otherwise, `onSessionCreated` callback is called asynchronously
 */
- (void)mount {
    _isMounted = YES;
    
    _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];
    
    OTError *error = nil;
    [_session connectWithToken:_token error:&error];
    
    if (error) {
        _onStartFailure(@{});
    }
}

/**
 * Creates an instance of `OTPublisher` and publishes stream to the current
 * session
 *
 * Calls `onPublishError` in case of an error, otherwise, a camera preview is inserted
 * inside the mounted view
 */
- (void)startPublishing {
    _publisher = [[OTPublisher alloc] initWithDelegate:self];
    
    OTError *error = nil;
    
    [_session publish:_publisher error:&error];
    
    if (error) {
        _onPublishError(@{});
        return;
    }
    
    [_publisher.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_publisher.view];
}

- (void)cleanupPublisher {
    [_publisher.view removeFromSuperview];
    _publisher = nil;
}

# pragma mark - OTSession delegate callbacks

/**
 * When session is created, we start publishing straight away
 */
- (void)sessionDidConnect:(OTSession*)session {
    _onConnected(@{});
    [self startPublishing];
}

- (void)sessionDidDisconnect:(OTSession*)session {
    _onDisconnected(@{});
}

- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {
    _onStreamCreated(@{});
}

- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {
    _onStreamDestroyed(@{});
}

- (void)session:(OTSession *)session connectionCreated:(OTConnection *)connection {
    _onConnectionCreated(@{});
}

- (void)session:(OTSession *)session connectionDestroyed:(OTConnection *)connection {
    _onConnectionDestroyed(@{});
}

- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    _onUnknownError(@{});
}

# pragma mark - OTPublisher delegate callbacks

- (void)publisher:(OTPublisherKit *)publisher streamCreated:(OTStream *)stream {
    _onStreamCreated(@{});
}

- (void)publisher:(OTPublisherKit*)publisher streamDestroyed:(OTStream *)stream
{
    _onStreamDestroyed(@{});
    [self cleanupPublisher];
}

- (void)publisher:(OTPublisherKit*)publisher didFailWithError:(OTError*) error
{
    _onUnknownError(@{});
    [self cleanupPublisher];
}

/**
 * Remove session when this component is unmounted
 */
- (void)dealloc {
    [self cleanupPublisher];
    [_session disconnect:nil];
}

@end
