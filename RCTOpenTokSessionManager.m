/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTOpenTokSessionManager.h"
#import "RCTEventDispatcher.h"
#import <OpenTok/OpenTok.h>

@implementation RCTOpenTokSessionManager {
    OTSession *_session;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(connect:(NSString *)apiKey sessionId:(NSString *)sessionId token:(NSString *)token)
{
  _session = [[OTSession alloc] initWithApiKey:apiKey sessionId:sessionId delegate:self];

  OTError *error = nil;
  [_session connectWithToken:token error:&error];

  if (error) {
    NSLog(@"connect failed with error: (%@)", error);
  } else {
    NSLog(@"session created");
  }
}

RCT_EXPORT_METHOD(sendMessage:(NSString *)message)
{
  NSLog(@"signal error %@", message);
  OTError* error = nil;
  [_session signalWithType:@"message" string:message connection:nil error:&error];
  if (error) {
      NSLog(@"signal error %@", error);
  } else {
      NSLog(@"signal sent");
  }
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {}
- (void)sessionDidDisconnect:(OTSession*)session {}
- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {}
- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {}
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {}

- (void)session:(OTSession*)session receivedSignalType:(NSString*)type fromConnection:(OTConnection*)connection withString:(NSString*)string {
    NSLog(@"Received signal %@", string);
    [self onMessageReceived:string data:connection.data];
}

- (void)onMessageReceived:(NSString *)message data:(NSString *)data
{
  [self.bridge.eventDispatcher sendAppEventWithName:@"onMessageReceived"
    body:@{
      @"message": message,
      @"data": data,
    }];
}

@end
