#import <Foundation/Foundation.h>
#import "RNOpenTokEventEmitter.h"

@implementation RNOpenTokEventEmitter

RCT_EXPORT_MODULE();
- (NSArray<NSString *> *)supportedEvents {
    return @[@"onSessionDidConnect",
             @"onSessionDidDisconnect",
             @"onSessionStreamCreated",
             @"onSessionStreamDestroyed",
             @"onSessionDidFailWithError",
             @"onSessionConnectionCreated",
             @"onSessionConnectionDestroyed",
             @"onSignalReceived",
             @"onSubscribeStart",
             @"onSubscribeStop",
             @"onSubscribeError",
             @"onPublishStart",
             @"onPublishStop",
             @"onPublishError",
             @"errorNoScreenCaptureView"];
}

- (void)startObserving {
    for (NSString *eventName in [self supportedEvents]) {
        [[NSNotificationCenter defaultCenter]
         addObserver:self
         selector:@selector(handleNotification:)
         name:eventName
         object:nil];
    }
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)handleNotification:(NSNotification *)notification {
    [self sendEventWithName:notification.name body:notification.userInfo];
}


@end
