#import <OpenTok/OpenTok.h>

@interface RNOpenTokSessionManager : NSObject {
    OTSession *session;
}

@property (nonatomic, retain) OTSession *session;
@property (nonatomic, retain) NSMutableDictionary *sessions;
@property (nonatomic, retain) NSString *_apiKey;
@property (nonatomic, retain) NSString* const UpdatedSession;

+ (id)sessionManager;

- (void)connectToSession:(NSString*)sessionId withToken:(NSString*)token;

@end
