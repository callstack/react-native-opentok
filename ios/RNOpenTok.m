#import "RNOpenTok.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTBridge.h"
#else
#import "React/RCTBridge.h"
#endif

#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import "React/RCTEventDispatcher.h"
#endif

#import <OpenTok/OpenTok.h>
#import "RNOpenTokSessionManager.h"

@implementation RNOpenTok

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(connectToSession:(NSString *)sessionId withToken:(NSString *)token) {
    RNOpenTokSessionManager *sessionManager = [RNOpenTokSessionManager sessionManager];
    [[RNOpenTokSessionManager sessionManager] connectToSession:sessionId withToken:token];
}

RCT_EXPORT_METHOD(disconnect) {
    OTSession *session = [[RNOpenTokSessionManager sessionManager] session];
    
    NSError *error;
    [session disconnect:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
}

@end
