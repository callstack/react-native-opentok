#import <UIKit/UIKit.h>
#import "RNOpenTokSessionObserver.h"

@class RCTEventDispatcher;

@interface RNOpenTokSubscriberView : RNOpenTokSessionObserver

/**
 * Define props which tells the Subscriber if should emit an audio as well.
 */
@property (nonatomic, assign) BOOL mute;

/**
 * Define props which tells the Subscriber if should emit a video as well.
 */
@property (nonatomic, assign) BOOL video;

/**
 * Define whether the video should scale to fill the frame or fit into it.
 */
@property (nonatomic, assign) NSString *videoScale;

@end
