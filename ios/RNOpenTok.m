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

RCT_EXPORT_METHOD(initSession:(NSString *)sessionId) {
    RNOpenTokSessionManager *sessionManager = [RNOpenTokSessionManager initSessionManager];
    OTSession *session = [sessionManager session];
    if( session ) {
        [session disconnect];
    }
    [[RNOpenTokSessionManager sessionManager] connectToSession:sessionId];
}

RCT_EXPORT_METHOD(changeSession:(NSString *)sessionId) {
    [[RNOpenTokSessionManager sessionManager] connectToSession:sessionId];
}

RCT_EXPORT_METHOD(connectWithToken:(NSString *)token) {
    OTSession *session = [[RNOpenTokSessionManager sessionManager] session];
    
    NSError *error;
    [session connectWithToken:token error:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
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
