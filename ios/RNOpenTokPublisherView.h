#import <UIKit/UIKit.h>
#import <OpenTok/OTPublisherKit.h>
#import "RNOpenTokSessionObserver.h"

@class RCTEventDispatcher;

@interface RNOpenTokPublisherView : RNOpenTokSessionObserver

#define CameraTypeNamesArray @"front", @"back", @"unspecified", nil

/**
 * Define props which tells the Publisher if should publish as audio as well.
 */
@property (nonatomic, assign) BOOL mute;

@property (nonatomic, strong) NSString *camera;

@end
