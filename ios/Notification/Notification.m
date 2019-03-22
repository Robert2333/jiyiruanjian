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

-(void)setNotification:(NSString *)title time:(NSString *)time{
  //时间转换
    double timeNum=[time doubleValue];
  
  
  //获取scenter，因为是单例
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  //timeInterval：单位为秒（s）  repeats：是否循环提醒
  //50s后提醒
  UNTimeIntervalNotificationTrigger *trigger1 = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:timeNum repeats:NO];
  UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];

  content.title = title;
  content.subtitle = [NSString stringWithFormat:@"Dely 装逼大会竞选时间提醒 - subtitle"];
  content.body = @"Dely 装逼大会总决赛时间到，欢迎你参加总决赛！希望你一统X界 - body";
  content.badge = @666;
  content.sound = [UNNotificationSound defaultSound];
  content.userInfo = @{@"key1":@"value1",@"key2":@"value2"};
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"xxxx" content:content trigger:trigger1];
  [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
    if (!error) {
      //NSLog(@"推送已添加成功 %@", "xxx");
      //你自己的需求例如下面：
      UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"本地通知" message:@"成功添加推送" preferredStyle:UIAlertControllerStyleAlert];
      UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
      [alert addAction:cancelAction];
      [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
      //此处省略一万行需求。。。。
    }
  }];
}

RCT_EXPORT_METHOD(addEvent:(NSString *)title time:(NSString *)time)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", title, time);
  [self setNotification:title time:time];
}

@end
