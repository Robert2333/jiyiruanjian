/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UserNotifications/UserNotifications.h>
@implementation AppDelegate
{
RCTBridge* _myBridge;
  RCTRootView* _rootView;
}
// 通知的点击事件
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler{
  
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  UNNotificationRequest *request = response.notification.request; // 收到推送的请求
  UNNotificationContent *content = request.content; // 收到推送的消息内容
  NSNumber *badge = content.badge;  // 推送消息的角标
  NSString *body = content.body;    // 推送消息体
  UNNotificationSound *sound = content.sound;  // 推送消息的声音
  NSString *subtitle = content.subtitle;  // 推送消息的副标题
  NSString *title = content.title;  // 推送消息的标题
//  static NSString* str=@"1";
//  NSArray *imageList = @[@"http://foo.com/bar1.png",
//                         @"http://foo.com/bar2.png"];
//
  NSDictionary *props = @{@"notificationDate" : subtitle};
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_myBridge
//                                                   moduleName:@"ImageBrowserApp"
//                                            initialProperties:props];
  _rootView.appProperties=props;
  // Warning: UNUserNotificationCenter delegate received call to -userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler: but the completion handler was never called.
  completionHandler();  // 系统要求执行这个方法
  
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center
willPresentNotification:(UNNotification *)notification
        withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
  completionHandler(UNNotificationPresentationOptionAlert);
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  _myBridge=bridge;
//  NSArray *imageList = @[@"1",
//                         @"2"];
  
  NSDictionary *props = @{@"notificationDate" : @""};
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"AwesomeProject"
                                            initialProperties:props];
  _rootView=rootView;
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // 获取通知中心--单例
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  //设置代理
  center.delegate = self;

  //获取用户的推送授权 iOS 10新方法
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionSound)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {

                        }];

  //获取当前的通知设置，UNNotificationSettings 是只读对象，readOnly，只能通过以下方法获取
  [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {

  }];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
