#ifndef RNOpenTokSessionObserver_h
#define RNOpenTokSessionObserver_h
#endif
#import "RNOpenTokSessionManager.h"

@interface RNOpenTokSessionObserver : UIView;
@property (nonatomic, strong) NSString *sessionId;
@property (nonatomic, strong) OTSession *session;

- (void)observeSession;
- (void)stopObserveSession;
- (void)connectToSession;

@end
