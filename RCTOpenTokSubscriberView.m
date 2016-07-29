/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

@import UIKit;
#import "RCTOpenTokSubscriberView.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokSubscriberView () <OTSessionDelegate, OTSubscriberDelegate>

@end

@implementation RCTOpenTokSubscriberView {
    OTSession *_session;
    OTSubscriber *_subscriber;
}

/**
 * Mounts component after all props were passed
 */
- (void)didMoveToWindow {
    [super didMoveToSuperview];
    [self mount];
}

/**
 * Creates a new session with a given apiKey, sessionID and token
 *
 * Calls `onSubscribeError` in case an error happens during initial creation.
 */
- (void)mount {
    _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];

    OTError *error = nil;
    [_session connectWithToken:_token error:&error];

    if (error) {
        _onSubscribeError(RCTJSErrorFromNSError(error));
    }
}

/**
 * Creates an instance of `OTSubscriber` and subscribes to stream in current
 * session
 */
- (void)doSubscribe:(OTStream*)stream {
    _subscriber = [[OTSubscriber alloc] initWithStream:stream delegate:self];
    OTError *error = nil;

    [_session subscribe:_subscriber error:&error];

    if (error)
    {
      _onSubscribeError(RCTJSErrorFromNSError(error));
      return;
    }

    [self attachSubscriberView];
}

/**
 * Attaches subscriber preview
 */
- (void)attachSubscriberView {
    [_subscriber.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_subscriber.view];
}

/**
 * Cleans subscriber
 */
- (void)cleanupSubscriber {
    [_subscriber.view removeFromSuperview];
    _subscriber = nil;
}

#pragma mark - OTSession delegate callbacks

/**
 * Called when session is created
 */
- (void)sessionDidConnect:(OTSession*)session {}

/**
 * Called when session is destroyed
 */
- (void)sessionDidDisconnect:(OTSession*)session {}

/**
 * When stream is created we start subscribtion
 *
 * @todo we only support subscribing to a single stream, multiple streams
 * are out of scope for our use-cases. Contributions welcome.
 */
- (void)session:(OTSession*)session streamCreated:(OTStream*)stream {
    if (_subscriber == nil) {
        [self doSubscribe:stream];
    }
}

/**
 * Called when stream is destroyed
 */
- (void)session:(OTSession*)session streamDestroyed:(OTStream*)stream {
    _onSubscribeStop(@{});
}

/**
 * Called when session error occurs
 */
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    _onSubscribeError(RCTJSErrorFromNSError(error));
}

#pragma mark - OTSubscriber delegate callbacks

- (void)subscriber:(OTSubscriberKit*)subscriber didFailWithError:(OTError*)error {
    _onSubscribeError(RCTJSErrorFromNSError(error));
    [self cleanupSubscriber];
}

- (void)subscriberDidConnectToStream:(OTSubscriberKit*)subscriber {
    _onSubscribeStart(@{});
}

- (void)subscriberDidDisconnectFromStream:(OTSubscriberKit*)subscriber {
    _onSubscribeStop(@{});
}

- (void)subscriberDidReconnectToStream:(OTSubscriberKit*)subscriber {
    _onSubscribeStart(@{});
}

/**
 * Remove session when this component is unmounted
 */
- (void)dealloc {
    [self cleanupSubscriber];
    [_session disconnect:nil];
}

@end
