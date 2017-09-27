#import <OpenTok/OpenTok.h>

@interface RNOpenTokSessionManager : NSObject {
    OTSession *session;
}

@property (nonatomic, retain) OTSession *session;
@property (nonatomic, retain) NSString *_apiKey;
@property (nonatomic, retain) NSString* const UpdatedSession;

+ (id)sessionManager;
+ (id)initSessionManager;

- (void)connectToSession:(NSString*)sessionId;

@end
