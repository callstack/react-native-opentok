#ifndef RNOpenTokSessionObserver_h
#define RNOpenTokSessionObserver_h
#endif
#import "RNOpenTokSessionManager.h"

@interface RNOpenTokSessionObserver : UIView {
    OTSession *_session;
};

@property (nonatomic, strong) NSString *sessionId;

- (void)observeSession;
- (void)stopObserveSession;
- (void)connectToSession;

@end
