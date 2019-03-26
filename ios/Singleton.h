//
//  Singleton.h
//  AwesomeProject
//
//  Created by 徐俊超 on 2019/3/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

@interface Singleton : NSObject
{
  @public NSString * date;
}
+(instancetype) shareInstance;
+(id) allocWithZone:(struct _NSZone *)zone;
-(id) copyWithZone:(struct _NSZone *)zone;
@end
