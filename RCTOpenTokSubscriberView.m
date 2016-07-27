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

@interface RCTOpenTokSubscriberView () <OTSessionDelegate>

@end

@implementation RCTOpenTokSubscriberView {
    BOOL _isMounted;
    OTSession *_session;
    OTSubscriber *_subscriber;
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
        _onStartFailure(RCTJSErrorFromNSError(error));
    }
}

/**
 * Creates an instance of `OTSubscriber` and subscribes to stream in current
 * session
 */
- (void)doSubscribe {
  _subscriber = [[OTSubscriber alloc] initWithStream:stream
                                            delegate:self];
  OTError *error = nil;
  [_session subscribe:_subscriber error:&error];
  if (error)
  {
      NSLog(@"Unable to publish (%@)",
            error.localizedDescription);
  }
}

- (void)cleanupSubscriber {
  [_subscriber.view removeFromSuperview];
  _subscriber = nil;
}

# pragma mark - OTSession delegate callbacks

/**
 * When session is created, we start subscribing straight away
 */
- (void)sessionDidConnect:(OTSession*)session {
    _onConnected(@{});
    [self doSubscribe];
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
    _onUnknownError(RCTJSErrorFromNSError(error));
}

# pragma mark - OTSubscriber delegate callbacks

- (void)subscriber:(OTSubscriberKit *)subscriber streamCreated:(OTStream *)stream {
    _onStreamCreated(@{});
}

- (void)subscriber:(OTSubscriberKit *)subscriber streamDestroyed:(OTStream *)stream
{
    _onStreamDestroyed(@{});
    [self cleanupSubscriber];
}

- (void)subscriber:(OTSubscriberKit *)subscriber didFailWithError:(OTError*)error
{
    _onUnknownError(RCTJSErrorFromNSError(error));
    [self cleanupSubscriber];
}

/**
 * Remove session when this component is unmounted
 */
- (void)dealloc {
    [self cleanupSubscriber];
    [_session disconnect:nil];
}

@end
