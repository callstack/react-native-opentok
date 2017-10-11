#import "RNOpenTok.h"
#import <OpenTok/OpenTok.h>
#import "RNOpenTokSessionManager.h"

@implementation RNOpenTok

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(connect:(NSString *)sessionId withToken:(NSString *)token resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    OTSession* session = [[RNOpenTokSessionManager sessionManager] connectToSession:sessionId withToken:token];
    session.delegate = self;
    resolve(@YES);
}

RCT_EXPORT_METHOD(disconnect:(NSString *)sessionId) {
    [[RNOpenTokSessionManager sessionManager] disconnectSession:sessionId];
}

RCT_EXPORT_METHOD(disconnectAll) {
    [[RNOpenTokSessionManager sessionManager] disconnectAllSessions];
}

RCT_EXPORT_METHOD(sendSignal:(NSString *)sessionId type:(NSString *)type data:(NSString *)data resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    OTSession *session = [[RNOpenTokSessionManager sessionManager] getSession:sessionId];
    OTError* error = nil;
    
    [session signalWithType:type string:data connection:nil error:&error];
    
    if (error) {
        reject(@"not_sent", @"Signal wasn't sent", error);
    } else {
        resolve(@YES);
    }
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:[@"session-did-connect:" stringByAppendingString:session.sessionId]
     object:nil];
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionDidConnect"
     object:nil
     userInfo:@{@"sessionId": session.sessionId}];
}

- (void)sessionDidDisconnect:(OTSession*)session {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionDidDisconnect"
     object:nil
     userInfo:@{@"sessionId": session.sessionId}];
}

- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:[@"stream-created:" stringByAppendingString:session.sessionId]
     object:nil
     userInfo:@{@"stream":stream}];

    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionStreamCreated"
     object:nil
     userInfo:@{@"sessionId": session.sessionId, @"streamId": stream.streamId}];
}

- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionStreamDestroyed"
     object:nil
     userInfo:@{@"sessionId": session.sessionId, @"streamId": stream.streamId}];
}

- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionDidFailWithError"
     object:nil
     userInfo:@{@"sessionId": session.sessionId, @"error": [error description]}];
}

- (void)session:(OTSession*)session receivedSignalType:(NSString*)type fromConnection:(OTConnection*)connection withString:(NSString*)message {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSignalReceived"
     object:nil
     userInfo:@{@"sessionId":session.sessionId, @"type":type, @"data": message, @"connectionId": connection.connectionId}];
}

- (void)session:(OTSession *)session connectionCreated:(OTConnection *)connection {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionConnectionCreated"
     object:nil
     userInfo:@{@"sessionId":session.sessionId, @"connectionId": connection.connectionId}];
}

- (void)session:(OTSession *)session connectionDestroyed:(OTConnection *)connection {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"onSessionConnectionDestroyed"
     object:nil
     userInfo:@{@"sessionId":session.sessionId, @"connectionId": connection.connectionId}];
}

@end
