#import "RNOpenTokSessionManager.h"

#import <OpenTok/OpenTok.h>

@implementation RNOpenTokSessionManager

@synthesize _apiKey;
@synthesize sessions;


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

- (id)getSession:(NSString *)sessionId {
    return sessions[sessionId];
}

- (void)disconnectSession:(NSString*)sessionId {
    OTSession *session = sessions[sessionId];
    NSError *error;
    [session disconnect:&error];
    
    if (error) {
        NSLog(@"%@", error);
    }
    [sessions removeObjectForKey:sessionId];
}

- (void)disconnectAllSessions {
    for (NSString* key in sessions) {
        id session = sessions[key];
        NSError *error;
        
        [session disconnect:&error];
        
        if (error) {
            NSLog(@"%@", error);
        }
    }
    [sessions removeAllObjects];
}

- (void)connectToSession:(NSString*)sessionId withToken:(NSString*)token{
    OTSession *session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:sessionId delegate:nil];
    NSError *error;
    
    [session connectWithToken:token error:&error];
    if (error) {
        NSLog(@"%@", error);
    }
    sessions[sessionId] = session;
    [self notifyObservers:sessionId];
}

#pragma mark Private Methods

- (id)initWithApiKey:(NSString*)apiKey {
    _apiKey = apiKey;
    sessions = [[NSMutableDictionary alloc] init];
    return self;
}

- (void)notifyObservers:(NSString *)sessionId {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:[@"session-updated:" stringByAppendingString:sessionId]
     object:nil];
}

- (void)dealloc {}

@end
