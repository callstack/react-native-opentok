#import <OpenTok/OpenTok.h>

@interface RNOpenTokSessionManager : NSObject;

@property (nonatomic, retain) NSMutableDictionary *sessions;
@property (nonatomic, retain) NSString *_apiKey;

+ (id)sessionManager;

- (id)connectToSession:(NSString*)sessionId withToken:(NSString*)token;
- (id)getSession:(NSString*)sessionId;
- (void)disconnectSession:(NSString*)sessionId;
- (void)disconnectAllSessions;

@end
