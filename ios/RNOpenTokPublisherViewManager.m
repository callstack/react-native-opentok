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

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(sessionId, NSString)

RCT_EXPORT_VIEW_PROPERTY(camera, NSInteger)

RCT_EXPORT_VIEW_PROPERTY(mute, BOOL)

RCT_EXPORT_VIEW_PROPERTY(video, BOOL)

RCT_EXPORT_VIEW_PROPERTY(screenCapture, BOOL)

RCT_EXPORT_VIEW_PROPERTY(screenCaptureSettings, NSDictionary*)

- (UIView *)view {
    return [[RNOpenTokPublisherView alloc] initWithUIManager:_bridge.uiManager];
}

@end
