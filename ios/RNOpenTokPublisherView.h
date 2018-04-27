#import <UIKit/UIKit.h>
#import <OpenTok/OTPublisherKit.h>
#import "RNOpenTokSessionObserver.h"

#if __has_include(<React/RCTUIManager.h>)
#import <React/RCTUIManager.h>
#elif __has_include("RCTUIManager.h")
#import "RCTUIManager.h"
#else
#import "React/RCTUIManager.h"
#endif

@class RCTEventDispatcher;

@interface RNOpenTokPublisherView : RNOpenTokSessionObserver

/**
 * Define props which tells the Publisher if should publish as audio as well.
 */
@property (nonatomic, assign) BOOL mute;

@property (nonatomic, assign) NSInteger camera;

/**
 * Define props which tells the Publisher which camera direction to use.
 */
@property (nonatomic, assign) NSString *cameraDirection;
/**
 * Define props which tells the Publisher if should publish a video as well.
 */
@property (nonatomic, assign) BOOL video;

/**
 * Define whether the video should scale to fill the frame or fit into it.
 */
@property (nonatomic, assign) NSString *videoScale;

/**
 * Define whether to capture screen or camera.
 */
@property (nonatomic, assign) BOOL screenCapture;

/**
 * Define settings for screen capture.
 */
@property (nonatomic) NSDictionary* screenCaptureSettings;

- (instancetype)initWithUIManager:(RCTUIManager*)uiManager;

@end
