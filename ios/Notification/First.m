//
//  First.m
//  AwesomeProject
//
//  Created by 徐俊超 on 2019/3/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "First.h"

@implementation First
RCT_EXPORT_MODULE();
-(NSString *)getFirstProp{
  Singleton *s=[[Singleton alloc]init];
  NSString *hello=s->date;
  return hello;
}


RCT_EXPORT_METHOD(addEventtest:(RCTResponseSenderBlock)callback){
   NSString * str=  [self getFirstProp];
  if(str==nil)
    str=@"";
   callback(@[str]);
  Singleton *s=[[Singleton alloc]init];
  s->date=@"";
}
@end
