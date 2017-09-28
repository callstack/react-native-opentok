#import <Foundation/Foundation.h>
#import "RNOpenTokSubscriberView.h"
#import "RNOpenTokSessionObserver.h"

#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import "React/RCTEventDispatcher.h"
#endif

#import <OpenTok/OpenTok.h>

@interface RNOpenTokSubscriberView () <OTSubscriberDelegate>
@end

@implementation RNOpenTokSubscriberView {
    OTSubscriber *_subscriber;
    RCTEventDispatcher *_eventDispatcher;
}

@synthesize sessionId = _sessionId;
@synthesize session = _session;

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
    [self observeStream];
    if (!_session) {
        [self connectToSession];
    }
}

- (void)doSubscribe:(OTStream*)stream {
    [self unsubscribe];
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
    [self unsubscribe];
    _subscriber.delegate = nil;
    _subscriber = nil;
}

- (void)dealloc {
    [self stopObserveSession];
    [self stopObserveStream];
    [self cleanupSubscriber];
}

- (void)onStreamCreated:(NSNotification *)notification {
    OTStream *stream = notification.userInfo[@"stream"];
    if (_subscriber == nil) {
        [self doSubscribe:stream];
    }
}

- (void)observeStream {
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(onStreamCreated:)
     name:[@"stream-created:" stringByAppendingString:_sessionId]
     object:nil];
}

- (void)stopObserveStream {
    [[NSNotificationCenter defaultCenter]
     removeObserver:self
     name:[@"stream-created:" stringByAppendingString:_sessionId]
     object:nil];
}

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
