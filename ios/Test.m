//
//  Test.m
//  AwesomeProject
//
//  Created by 徐俊超 on 2019/3/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "Test.h"

@implementation Test
{
  NSString * date;
}
static Singleton* _instance = nil;
+(instancetype) shareInstance
{
  static dispatch_once_t onceToken ;
  dispatch_once(&onceToken, ^{
    _instance = [[super allocWithZone:NULL] init] ;
  }) ;
  return _instance ;
}

+(id) allocWithZone:(struct _NSZone *)zone
{
  return [Singleton shareInstance] ;
}

-(id) copyWithZone:(struct _NSZone *)zone
{
  return [Singleton shareInstance] ;
}
@end
