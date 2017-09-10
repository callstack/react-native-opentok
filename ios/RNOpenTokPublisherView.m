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

@interface RNOpenTokPublisherView () <OTSessionDelegate, OTPublisherDelegate>
@end

@implementation RNOpenTokPublisherView : UIView  {
  OTSession *_session;
  OTPublisher *_publisher;
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
    [self cleanupPublisher];

    if (!_session) {
      [self createSession];
    }
}

- (id)createSession {
    OTSession *session = [[RNOpenTokSessionManager sessionManager] session];
    session.delegate = self;
    _session = session;
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

- (void)attachPublisherView {
    [_publisher.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_publisher.view];
}

- (void)cleanupPublisher {
    [_publisher.view removeFromSuperview];
    _publisher = nil;
}

- (void)dealloc {
    [self cleanupPublisher];
}

#pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {
    [self startPublishing];
}
- (void)sessionDidDisconnect:(OTSession*)session {}
- (void)session:(OTSession*)session streamCreated:(OTStream*)stream {}
- (void)session:(OTSession*)session streamDestroyed:(OTStream*)stream {}
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {}

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
