#import <UIKit/UIKit.h>
#import <OpenTok/OTPublisherKit.h>
#import "RNOpenTokSessionObserver.h"

@class RCTEventDispatcher;

@interface RNOpenTokPublisherView : RNOpenTokSessionObserver

/**
 * Define props which tells the Publisher if should publish as audio as well.
 */
@property (nonatomic, assign) BOOL mute;

@property (nonatomic, assign) NSInteger camera;
/**
 * Define props which tells the Publisher if should publish a video as well.
 */
@property (nonatomic, assign) BOOL video;


@end
