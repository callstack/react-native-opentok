#import "RCTOpenTokPublisherViewManager.h"
#import "RCTOpenTokPublisherView.h"

@implementation RCTOpenTokPublisherViewManager

- (UIView *)view {
    return [RCTOpenTokPublisherView new];
}

@end
