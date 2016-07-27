#import "RCTOpenTokSubscriberViewManager.h"
#import "RCTOpenTokSubscriberView.h"

@implementation RCTOpenTokSubscriberViewManager

- (UIView *)view {
    return [RCTOpenTokSubscriberView new];
}

RCT_EXPORT_MODULE()

@end
