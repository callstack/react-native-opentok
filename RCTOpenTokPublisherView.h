@import UIKit;
#import "RCTEventDispatcher.h"
#import "RCTComponent.h"

@interface RCTOpenTokPublisherView : UIView

@property (nonatomic, strong) NSString *apiKey;
@property (nonatomic, strong) NSString *sessionId;
@property (nonatomic, strong) NSString *token;

@property (nonatomic, strong) RCTDirectEventBlock onStartFailure;
@property (nonatomic, strong) RCTDirectEventBlock onConnected;
@property (nonatomic, strong) RCTDirectEventBlock onDisconnected;
@property (nonatomic, strong) RCTDirectEventBlock onStreamCreated;
@property (nonatomic, strong) RCTDirectEventBlock onStreamDestroyed;
@property (nonatomic, strong) RCTDirectEventBlock onConnectionCreated;
@property (nonatomic, strong) RCTDirectEventBlock onConnectionDestroyed;
@property (nonatomic, strong) RCTDirectEventBlock onUnknownError;


@end
