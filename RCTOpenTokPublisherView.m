@import UIKit;
#import "RCTOpenTokPublisherView.h"
#import "RCTEventDispatcher.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokPublisherView () <OTSessionDelegate>

@end

@implementation RCTOpenTokPublisherView {
    BOOL _isMounted;
    OTSession *_session;
}

- (void)mount {
    _isMounted = YES;
    
    _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];
    
    OTError *error = nil;
    [_session connectWithToken:_token error:&error];
    
    if (error && _onStartFailure) {
        _onStartFailure(@{});
    }
}

- (void)didMoveToWindow {
    [super didMoveToSuperview];
    if (!_isMounted) {
        [self mount];
    }
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {
    if (_onConnected) {
        _onConnected(@{});
    }
}

- (void)sessionDidDisconnect:(OTSession*)session {
    if (_onDisconnected) {
        _onDisconnected(@{});
    }
}

- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {
    if (_onStreamCreated) {
        _onStreamCreated(@{});
    }
}

- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {
    if (_onStreamDestroyed) {
        _onStreamDestroyed(@{});
    }
}

- (void)session:(OTSession *)session connectionCreated:(OTConnection *)connection {
    if (_onConnectionCreated) {
        _onConnectionCreated(@{});
    }
}

- (void)session:(OTSession *)session connectionDestroyed:(OTConnection *)connection {
    if (_onConnectionDestroyed) {
        _onConnectionDestroyed(@{});
    }
}

- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    if (_onUnknownError) {
        _onUnknownError(@{});
    }
}

@end
