#import <Foundation/Foundation.h>
#import "RNOpenTokSessionObserver.h"

@implementation RNOpenTokSessionObserver : UIView

- (void)connectToSession {
    _session = [[RNOpenTokSessionManager sessionManager] getSession:_sessionId];
}

- (void)observeSession {
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(connectToSession)
     name:[@"session-updated:" stringByAppendingString:_sessionId]
     object:nil];
}

- (void)stopObserveSession {
    [[NSNotificationCenter defaultCenter]
     removeObserver:self
     name:[@"session-updated:" stringByAppendingString:_sessionId]
     object:nil];
}

@end
