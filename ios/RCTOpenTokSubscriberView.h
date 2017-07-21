/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

@import UIKit;
#import <React/RCTEventDispatcher.h>
#import <React/RCTComponent.h>

@interface RCTOpenTokSubscriberView : UIView

@property (nonatomic, strong) NSString *apiKey;
@property (nonatomic, strong) NSString *sessionId;
@property (nonatomic, strong) NSString *token;

@property (nonatomic, copy) RCTDirectEventBlock onSubscribeError;
@property (nonatomic, copy) RCTDirectEventBlock onSubscribeStop;
@property (nonatomic, copy) RCTDirectEventBlock onSubscribeStart;

@end
