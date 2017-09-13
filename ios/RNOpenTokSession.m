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

@implementation RNOpenTokSession {
    OTSession *_session;
}
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendMessage:(NSString *)message) {
    if (!_session) {
        [self createSession];
    }

    OTError* error = nil;
    [_session signalWithType:@"message" string:message connection:nil error:&error];

    if (error) {
        NSLog(@"Error while sending an signal: %@", error);
    }
}

#pragma mark - Private methods

- (id) createSession {
    OTSession *session = [[RNOpenTokSessionManager sessionManager] session];
    session.delegate = self;
    _session = session;
}

- (void) onMessageReceived:(NSString *)message {
    [self.bridge.eventDispatcher sendAppEventWithName:@"onMessageReceived" body:@{@"message": message}];
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {}
- (void)sessionDidDisconnect:(OTSession*)session {}
- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {}
- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {}
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {}

- (void)session:(OTSession*)session receivedSignalType:(NSString*)type fromConnection:(OTConnection*)connection withString:(NSString*)message {
    [self onMessageReceived:message];
}

@end
