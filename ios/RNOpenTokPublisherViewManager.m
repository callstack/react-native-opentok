#import <Foundation/Foundation.h>
#import "RNOpenTokPublisherViewManager.h"
#import "RNOpenTokPublisherView.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTBridge.h"
#else
#import "React/RCTBridge.h"
#endif

@implementation RNOpenTokPublisherViewManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (UIView *)view {
  return [[RNOpenTokPublisherView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
