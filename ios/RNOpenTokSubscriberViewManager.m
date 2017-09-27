#import <Foundation/Foundation.h>
#import "RNOpenTokSubscriberViewManager.h"
#import "RNOpenTokSubscriberView.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTBridge.h"
#else
#import "React/RCTBridge.h"
#endif

@implementation RNOpenTokSubscriberViewManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(sessionId, NSString)

- (UIView *)view {
    return [[RNOpenTokSubscriberView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
