#import "RNOpenTokSessionManager.h"

#import <OpenTok/OpenTok.h>

@implementation RNOpenTokSessionManager

@synthesize _apiKey;
@synthesize sessions;

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

- (void)connectToSession:(NSString*)sessionId withToken:(NSString*)token{
    OTSession *session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:sessionId delegate:nil];
    NSError *error;
    
    [session connectWithToken:token error:&error];
    if (error) {
        NSLog(@"%@", error);
    }
    sessions[sessionId] = session;
    [self notifyObservers];
}

#pragma mark Private Methods

- (id)initWithApiKey:(NSString*)apiKey {
    _apiKey = apiKey;
    sessions = [[NSMutableDictionary alloc] init];
    return self;
}

- (void)notifyObservers {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:UpdatedSession
     object:nil];
}

- (void)dealloc {}

@end
