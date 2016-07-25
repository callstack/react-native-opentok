@import UIKit;
#import "RCTOpenTokPublisherView.h"
#import "RCTEventDispatcher.h"
@import OpenTok;

@interface RCTOpenTokPublisherView () <OTSessionDelegate>

@end

@implementation RCTOpenTokPublisherView {
    BOOL _isMounted;
    OTSession *_session;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    if (!_isMounted) {
        [self mount];
    }
}

- (void)mount {
    _isMounted = YES;
    
    _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];
    
    OTError *error = nil;
    [_session connectWithToken:_token error:&error];
    
    if (error) {
        _onStartFailure([NSNull null]);
    }
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {
    _onConnected([NSNull null]);
}

- (void)sessionDidDisconnect:(OTSession*)session {
    _onDisconnected([NSNull null]);
}

- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {
    _onStreamCreated([NSNull null]);
}

- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {
    _onStreamDestroyed([NSNull null]);
}

- (void)session:(OTSession *)session connectionCreated:(OTConnection *)connection {
    _onConnectionCreated([NSNull null]);
}

- (void)session:(OTSession *)session connectionDestroyed:(OTConnection *)connection {
    _onConnectionDestroyed([NSNull null]);
}

- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    _onUnknownError([NSNull null]);
}

@end
