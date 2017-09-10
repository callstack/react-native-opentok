#import <OpenTok/OpenTok.h>

@interface RNOpenTokSessionManager : NSObject {
    OTSession *session;
}

@property (nonatomic, retain) OTSession *session;

+ (id)sessionManager;
+ (id)initSessionManager:(NSString*)apiKey sessionId:(NSString*)sessionId;

@end
