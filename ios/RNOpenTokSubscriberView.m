#import <Foundation/Foundation.h>
#import "RNOpenTokSubscriberView.h"
#import "RNOpenTokSessionManager.h"

#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import "React/RCTEventDispatcher.h"
#endif

#import <OpenTok/OpenTok.h>

@interface RNOpenTokSubscriberView () <OTSessionDelegate, OTSubscriberDelegate>
@end

@implementation RNOpenTokSubscriberView : UIView  {
    OTSession *_session;
    OTSubscriber *_subscriber;
    RCTEventDispatcher *_eventDispatcher;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher {
    if ((self = [super init])) {
        _eventDispatcher = eventDispatcher;
    }
    return self;
}

- (void)didMoveToWindow {
    [super didMoveToSuperview];
    [self mount];
}

- (void)mount {
    [self observeSession];
    if (!_session) {
        [self connectToSession];
    }
}

- (void)connectToSession {
    _session = [[RNOpenTokSessionManager sessionManager] getSession:_sessionId];
    _session.delegate = self;
}

- (void)doSubscribe:(OTStream*)stream {
    _subscriber = [[OTSubscriber alloc] initWithStream:stream delegate:self];
    
    OTError *error = nil;
    [_session subscribe:_subscriber error:&error];
    
    if (error) {
        [_eventDispatcher sendAppEventWithName:@"onSubscribeError" body:@{@"error": [error description]}];
        return;
    }
    
    [self attachSubscriberView];
}

- (void)unsubscribe {
    OTError *error = nil;
    [_session unsubscribe:_subscriber error:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
}

- (void)attachSubscriberView {
    [_subscriber.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_subscriber.view];
}

- (void)cleanupSubscriber {
    [_subscriber.view removeFromSuperview];
    _subscriber.delegate = nil;
    _subscriber = nil;
}

- (void)cleanupSession {
    [self unsubscribe];
    _session.delegate = nil;
}

- (void)dealloc {
    [self stopObserveSession];
    [self cleanupSession];
    [self cleanupSubscriber];
}

- (void)observeSession {
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(connectToSession)
     name:[@"session-updated:" stringByAppendingString:_sessionId]
     object:nil];
}

- (void)stopObserveSession {
    [[NSNotificationCenter defaultCenter]
     removeObserver:self
     name:[@"session-updated:" stringByAppendingString:_sessionId]
     object:nil];
}

#pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {}
- (void)sessionDidDisconnect:(OTSession*)session {}

- (void)session:(OTSession*)session streamCreated:(OTStream*)stream {
    if (_subscriber == nil) {
        [self doSubscribe:stream];
    }
}

- (void)session:(OTSession*)session streamDestroyed:(OTStream*)stream {}
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {}

#pragma mark - OTSubscriber delegate callbacks

- (void)subscriber:(OTSubscriberKit*)subscriber didFailWithError:(OTError*)error {
    [_eventDispatcher sendAppEventWithName:@"onSubscribeError" body:@{@"error": [error description]}];
    [self cleanupSubscriber];
}
- (void)subscriberDidConnectToStream:(OTSubscriberKit*)subscriber {
    [_eventDispatcher sendAppEventWithName:@"onSubscribeStart" body:nil];
}
- (void)subscriberDidDisconnectFromStream:(OTSubscriberKit*)subscriber {
    [_eventDispatcher sendAppEventWithName:@"onSubscribeStop" body:nil];
    [self cleanupSubscriber];
}

- (void)subscriberDidReconnectToStream:(OTSubscriberKit*)subscriber {
    [_eventDispatcher sendAppEventWithName:@"onSubscribeStart" body:nil];
}

@end
