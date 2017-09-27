#import "RNOpenTokSession.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
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

@implementation RNOpenTokSession

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendMessage:(NSString *)sessionId message:(NSString *)message resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    OTSession *session = [[RNOpenTokSessionManager sessionManager] getSession:sessionId];
    OTError* error = nil;
    
    [session signalWithType:@"message" string:message connection:nil error:&error];

    if (error) {
        reject(@"not_sent", @"Message wasn't sent", error);
    } else {
        resolve(@YES);
    }
}

#pragma mark - Private methods

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onMessageReceived"];
}

- (void)onMessageReceived:(NSString*)sessionId withMessage:(NSString *)message {
    [self sendEventWithName:@"onMessageReceived" body:@{@"sessionId":sessionId,@"message": message}];
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {}
- (void)sessionDidDisconnect:(OTSession*)session {}
- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {}
- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {}
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {}

- (void)session:(OTSession*)session receivedSignalType:(NSString*)type fromConnection:(OTConnection*)connection withString:(NSString*)message {
    [self onMessageReceived:session.sessionId withMessage:message];
}

@end
