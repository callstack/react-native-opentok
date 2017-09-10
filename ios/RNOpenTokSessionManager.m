#import "RNOpenTokSessionManager.h"

#import <OpenTok/OpenTok.h>

@implementation RNOpenTokSessionManager

@synthesize session;

#pragma mark Public Methods

+ (id)initSessionManager:(NSString*)apiKey sessionId:(NSString*)sessionId {
  static RNOpenTokSessionManager *sharedRNOpenTokSessionManager = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
      sharedRNOpenTokSessionManager =
        [[self alloc] initWithApiKey:apiKey andSessionId:sessionId];
  });
  return sharedRNOpenTokSessionManager;
}

+ (id)sessionManager {
  return [self initSessionManager:nil sessionId:nil];
}

#pragma mark Private Methods

- (id)initWithApiKey:(NSString*)apiKey andSessionId:(NSString*)sessionId {
  session = [[OTSession alloc] initWithApiKey:apiKey sessionId:sessionId delegate:nil];
  return self;
}

- (void)dealloc {}

@end
