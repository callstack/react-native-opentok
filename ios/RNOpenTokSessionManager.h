#import <OpenTok/OpenTok.h>

@interface RNOpenTokSessionManager : NSObject {
    OTSession *session;
}

@property (nonatomic, retain) OTSession *session;
@property (nonatomic, retain) NSString *_apiKey;

+ (id)sessionManager;
+ (id)initSessionManager:(NSString*)apiKey sessionId:(NSString*)sessionId;

- (void)connectToSession:(NSString*)sessionId;

@end
