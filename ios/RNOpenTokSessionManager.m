#import "RNOpenTokSessionManager.h"

#import <OpenTok/OpenTok.h>

@implementation RNOpenTokSessionManager

@synthesize session;
@synthesize _apiKey;

#pragma mark Public Methods

+ (id)initSessionManager:(NSString*)apiKey sessionId:(NSString*)sessionId {
    static RNOpenTokSessionManager *sharedRNOpenTokSessionManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      sharedRNOpenTokSessionManager =
        [[self alloc] initWithApiKey:apiKey sessionId:sessionId];
    });
    return sharedRNOpenTokSessionManager;
}

+ (id)sessionManager {
    return [self initSessionManager:nil sessionId:nil];
}

- (void)connectToSession:(NSString*)sessionId {
    NSError *error;
    [session disconnect:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
    session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:sessionId delegate:nil];
}

#pragma mark Private Methods

- (id)initWithApiKey:(NSString*)apiKey sessionId:(NSString*)sessionId {
    _apiKey = apiKey;
    [self connectToSession:sessionId];
    return self;
}

- (void)dealloc {}

@end
