
#ifndef RNOpenTokScreenSharingCapturer_h
#define RNOpenTokScreenSharingCapturer_h

#import <Foundation/Foundation.h>
#import <OpenTok/OpenTok.h>

@protocol OTVideoCapture;

#define MAX_EDGE_SIZE_LIMIT 1280.0f
#define EDGE_DIMENSION_COMMON_FACTOR 16.0f

@interface RNOpenTokScreenSharingCapturer : NSObject<OTVideoCapture>

@property(readonly) UIView* view;

- (instancetype)initWithView:(UIView*)view;

+ (void)dimensionsForInputSize:(CGSize)input
                 containerSize:(CGSize*)destContainerSize
                      drawRect:(CGRect*)destDrawReact;

@end


#endif /* RNOpenTokScreenSharingCapturer_h */
