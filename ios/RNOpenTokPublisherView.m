#import <Foundation/Foundation.h>
#import "RNOpenTokPublisherView.h"
#import "RNOpenTokSessionManager.h"

#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import "React/RCTEventDispatcher.h"
#endif

#import <OpenTok/OpenTok.h>

@interface RNOpenTokPublisherView () <OTPublisherDelegate>
@end

@implementation RNOpenTokPublisherView  {
    OTPublisher *_publisher;
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
    [self observeConnection];
    if (!_session) {
        [self connectToSession];
    }
}

- (void)startPublishing {
    _publisher = [[OTPublisher alloc] initWithDelegate:self];

    OTError *error = nil;

    [_session publish:_publisher error:&error];

    if (error) {
        [_eventDispatcher sendAppEventWithName:@"onPublishError" body:@{@"error": [error description]}];
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
}

- (void)attachPublisherView {
    [_publisher.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_publisher.view];
}

- (void)cleanupPublisher {
    [_publisher.view removeFromSuperview];
    [self stopPublishing];
    _publisher.delegate = nil;
    _publisher = nil;
}

- (void)onSessionConnect {
    [self startPublishing];
}

- (void)dealloc {
    [self stopObserveSession];
    [self stopObserveConnection];
    [self cleanupPublisher];
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
    [_eventDispatcher sendAppEventWithName:@"onPublishStart" body:nil];
}

- (void)publisher:(OTPublisherKit*)publisher streamDestroyed:(OTStream *)stream {
    [_eventDispatcher sendAppEventWithName:@"onPublishStop" body:nil];
    [self cleanupPublisher];
}

- (void)publisher:(OTPublisherKit*)publisher didFailWithError:(OTError*)error {
    [_eventDispatcher sendAppEventWithName:@"onPublishError" body:nil];
    [self cleanupPublisher];
}

@end
