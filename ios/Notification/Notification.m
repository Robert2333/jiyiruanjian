//
//  Notification.m
//  AwesomeProject
//
//  Created by 徐俊超 on 2019/3/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

#define notificationTime 10;

#import "Notification.h"
#import <React/RCTLog.h>
#import <UserNotifications/UserNotifications.h>


@implementation Notification

RCT_EXPORT_MODULE();



-(void) setNotification:(NSString * )title subTitle:(NSString *)subTitle time:(NSString *)time{
  double timeNum=[time doubleValue];
  //使用NSUserDefaults来保存
  
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  if(subTitle!=nil){
  NSString * key = [defaults objectForKey:subTitle];
  if(key==nil){//调试，应该为==
    [defaults setObject:subTitle forKey:subTitle];
    UNTimeIntervalNotificationTrigger *trigger=[self createTrigger:(1)];
    UNTimeIntervalNotificationTrigger *trigger1=[self createTrigger:(timeNum+60*30)];
    UNTimeIntervalNotificationTrigger *trigger2=[self createTrigger:(timeNum+60*60*12)];
    UNTimeIntervalNotificationTrigger *trigger3=[self createTrigger:(timeNum+60*60*24)];
    UNTimeIntervalNotificationTrigger *trigger4=[self createTrigger:(timeNum+60*60*24*2)];
    UNTimeIntervalNotificationTrigger *trigger5=[self createTrigger:(timeNum+60*60*24*4)];
    UNTimeIntervalNotificationTrigger *trigger6=[self createTrigger:(timeNum+60*60*24*7)];
    UNTimeIntervalNotificationTrigger *trigger7=[self createTrigger:(timeNum+60*60*24*15)];
    [self createNotification:@"通知设置成功" subTitle:[subTitle stringByAppendingString:@"-0"] trigger:trigger];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-1"] trigger:trigger1];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-2"] trigger:trigger2];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-3"] trigger:trigger3];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-4"] trigger:trigger4];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-5"] trigger:trigger5];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-6"] trigger:trigger6];
    [self createNotification:title subTitle:[subTitle stringByAppendingString:@"-7"] trigger:trigger7];
  }
  }
}

-(void)createNotification:(NSString *)title subTitle:(NSString *)subTitle trigger:(UNTimeIntervalNotificationTrigger *)trigger{
  //获取scenter，因为是单例
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
  
  content.title = title;
  content.subtitle = subTitle;
  content.body = @"复习喽";
  content.badge = [NSNumber numberWithInt:1];
  content.sound = [UNNotificationSound defaultSound];
  content.userInfo = @{@"key1":@"value1",@"key2":@"value2"};
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:subTitle content:content trigger:trigger];
  [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
    if (!error) {
      //NSLog(@"推送已添加成功 %@", "xxx");
      //你自己的需求例如下面：
//      UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"本地通知" message:@"成功添加推送" preferredStyle:UIAlertControllerStyleAlert];
//      UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
//      [alert addAction:cancelAction];
//      [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
      //此处省略一万行需求。。。。
    }
  }];
}

-(UNTimeIntervalNotificationTrigger *)createTrigger:(double)time{
  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:time repeats:NO];
  return trigger;
}


RCT_EXPORT_METHOD(addEvent:(NSString * )title subTtile:(NSString *)subTitle time:(NSString *)time)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", title, time);
  [self setNotification:title subTitle:subTitle time:time];
}

@end
