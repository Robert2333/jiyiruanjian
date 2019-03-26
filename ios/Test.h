//
//  Test.h
//  AwesomeProject
//
//  Created by 徐俊超 on 2019/3/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Test : NSObject
+(instancetype) shareInstance;
+(id) allocWithZone:(struct _NSZone *)zone;
-(id) copyWithZone:(struct _NSZone *)zone;
@end

NS_ASSUME_NONNULL_END
