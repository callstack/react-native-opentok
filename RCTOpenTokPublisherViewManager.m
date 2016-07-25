#import "RCTOpenTokPublisherViewManager.h"
#import "RCTOpenTokPublisherView.h"
#import "RCTComponent.h"

@implementation RCTOpenTokPublisherViewManager

- (UIView *)view {
    return [RCTOpenTokPublisherView new];
}

RCT_EXPORT_VIEW_PROPERTY(apiKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(sessionId, NSString)
RCT_EXPORT_VIEW_PROPERTY(token, NSString)
RCT_EXPORT_VIEW_PROPERTY(onSessionStartFailure, RCTDirectEventBlock)
@end
