#import "RNOpenTokSessionManager.h"

#import <OpenTok/OpenTok.h>

@implementation RNOpenTokSessionManager

@synthesize session;
@synthesize _apiKey;

NSString* const UpdatedSession = @"UpdatedSession";

#pragma mark Public Methods

+ (id)initSessionManager {
    NSString *apiKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"OPENTOK_API_KEY"];
    static RNOpenTokSessionManager *sharedRNOpenTokSessionManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedRNOpenTokSessionManager = [[self alloc] initWithApiKey:apiKey];
    });
    return sharedRNOpenTokSessionManager;
}

+ (id)sessionManager {
    return [self initSessionManager];
}

- (void)connectToSession:(NSString*)sessionId {
    NSError *error;
    [session disconnect:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
    session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:sessionId delegate:nil];
    [self notifyObservers];
}

- (void)notifyObservers {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:UpdatedSession
     object:nil];
}

#pragma mark Private Methods

- (id)initWithApiKey:(NSString*)apiKey {
    _apiKey = apiKey;
    return self;
}

- (void)dealloc {}

@end
