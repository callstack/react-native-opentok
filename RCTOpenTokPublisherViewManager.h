#import "RCTViewManager.h"
#import "RCTOpenTokPublisherView.h"

@interface RCTOpenTokPublisherViewManager : RCTViewManager

- (UIView *)view {
    return [RCTOpenTokPublisherView new];
}

@end
