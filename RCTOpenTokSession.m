/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

@import UIKit;
#import "RCTOpenTokSession.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokSession () <OTSessionDelegate>

@end

@implementation RCTOpenTokSession {
    OTSession *_session;
}

- (void)connect {
    _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];

    OTError *error = nil;
    [_session connectWithToken:_token error:&error];

    if (error) {
      NSLog(@"connect failed with error: (%@)", error);
    }
}

- (void)sendMessage: (NSString *)message {
  OTError* error = nil;
  [session signalWithType:type string:message connection:nil error:&error)];
  if (error) {
      NSLog(@"signal error %@", error);
  } else {
      NSLog(@"signal sent");
  }
}

#pragma mark - OTSession delegate callbacks

- (void)session:(OTSession *)session receivedSignalType:(NSString *)type fromConnection:(OTConnection *)connection withString:(NSString *)string {
  _onMessageRecieved(@{
      @"message": withString,
  })
}

- (void)dealloc {
    [_session disconnect:nil];
}

@end
