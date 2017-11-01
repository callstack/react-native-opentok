#import <UIKit/UIKit.h>
#import "RNOpenTokSessionObserver.h"

@class RCTEventDispatcher;

@interface RNOpenTokPublisherView : RNOpenTokSessionObserver

/**
 * Define props which tells the Publisher if should publish as audio as well.
 */
@property (nonatomic, assign) BOOL mute;

@end
