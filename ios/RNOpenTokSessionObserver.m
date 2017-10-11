#import <Foundation/Foundation.h>
#import "RNOpenTokSessionObserver.h"

@implementation RNOpenTokSessionObserver : UIView

- (void)connectToSession {
    self.session = [[RNOpenTokSessionManager sessionManager] getSession:self.sessionId];
}

- (void)observeSession {
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(connectToSession)
     name:[@"session-updated:" stringByAppendingString:self.sessionId]
     object:nil];
}

- (void)stopObserveSession {
    [[NSNotificationCenter defaultCenter]
     removeObserver:self
     name:[@"session-updated:" stringByAppendingString:self.sessionId]
     object:nil];
}

@end
