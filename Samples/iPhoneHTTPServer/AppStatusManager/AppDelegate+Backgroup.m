////
////  UIResponder+SFAppBackgroupView.m
////  SofficeMoi
////
////  Created by wangshengyuan on 17/2/8.
////  Copyright © 2017年 Soffice. All rights reserved.
////

#import "AppDelegate+Backgroup.h"
#import <objc/runtime.h>
#import <AVFoundation/AVFoundation.h>
#import "SFAppStatusManager.h"

@implementation AppDelegate (Backgroup)

/**
 Aop实现基类实现方法交换，解决多个Category之间的问题和调用原方法的正常调用
 @param originalSelector 原方法
 @param newSelector 交换的实现方法
 @param mySelector  如果原方法不存在的替换实现方法
 */
+ (void) exchangeInstanceMethodWithOriginSel:(SEL)originalSelector nSel:(SEL)newSelector mySel:(SEL)customSelector {
    NSParameterAssert(originalSelector);
    NSParameterAssert(newSelector);
    NSParameterAssert(customSelector);
    Class class = [self class];
    if ([class instancesRespondToSelector:originalSelector]) {
        Method originalMethod = class_getInstanceMethod(class, originalSelector);
        Method newMethod = class_getInstanceMethod(class, newSelector);
        method_exchangeImplementations(originalMethod, newMethod);
    }
    else {
        Method myMethod = class_getInstanceMethod(class, customSelector);
        class_addMethod(class, originalSelector, method_getImplementation(myMethod), method_getTypeEncoding(myMethod));
    }
}

//默认创建类别时自动调用
+ (void)load {
    NSLog(@"注册applicationStatusEnter");
    [self exchangeInstanceMethodWithOriginSel:@selector(applicationDidEnterBackground:) nSel:@selector(log_applicationDidEnterBackground:) mySel:@selector(mylog_applicationDidEnterBackground:)];
    [self exchangeInstanceMethodWithOriginSel:@selector(applicationWillEnterForeground:) nSel:@selector(log_applicationWillEnterForeground:) mySel:@selector(mylog_applicationWillEnterForeground:)];
}

//自定义实现该方法
- (void) mylog_applicationDidEnterBackground:(UIApplication *)application {
    [self applicationStatusEnter:YES];
}

//自定义替换实现该方法
- (void)log_applicationDidEnterBackground:(UIApplication *)application {
    [self applicationStatusEnter:YES];
    [self log_applicationDidEnterBackground:application];
}

- (void) mylog_applicationWillEnterForeground:(UIApplication *)application {
    [self applicationStatusEnter:NO];
}

//自定义替换实现该方法
- (void)log_applicationWillEnterForeground:(UIApplication *)application {
    [self applicationStatusEnter:NO];
    [self log_applicationWillEnterForeground:application];
}

- (void)applicationStatusEnter:(BOOL)enter {
    NSLog(@"系统进入了 > %@",enter?@"后台":@"前台");
    if (enter) {
        [SFAppStatusManager processAppEnterBackgroup];
        if (enableBgModel) {
            [self beginBackgroup];
            chectRemainingTimer = [NSTimer scheduledTimerWithTimeInterval:10 target:self selector:@selector(applyForMoreTime) userInfo:nil repeats:YES];//timer监听剩余时间再次申请后台操作
        }
    }
    else {
        if (enableBgModel) {
            [self endBackgroup];
        }
        [SFAppStatusManager processAppWillEnterForeground];
    }
}

- (void)applyForMoreTime {
    NSLog(@"后台操作还剩 %f秒",[UIApplication sharedApplication].backgroundTimeRemaining);
    if ([UIApplication sharedApplication].backgroundTimeRemaining < 30) { //时间小于30秒
        
        NSLog(@"通过播放音乐再次申请时间");
        //通过播放音乐再次申请时间
        [self playVidio];
        
        //时间小于30秒时再次申请时间
        [self beginBackgroup];
    }
}

static UIBackgroundTaskIdentifier bgTask;
static NSTimer *chectRemainingTimer;
static AVAudioPlayer *audioPlayer;
static BOOL enableBgModel = NO;

- (void)beginBackgroup {
    if (bgTask) {
        [[UIApplication sharedApplication] endBackgroundTask:bgTask];
    }
    NSLog(@"开始申请后台操作");
    bgTask = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^{
        //防止系统禁止使用后台时，要调用这里结束释放资源（控制好的话可以一直使用后台，这里不会调用）
        [self endBackgroup];
    }];
}

- (void)endBackgroup {
    NSLog(@"结束后台操作");
    [[UIApplication sharedApplication] endBackgroundTask:bgTask];
    bgTask = UIBackgroundTaskInvalid;
    if (chectRemainingTimer) {
        [chectRemainingTimer invalidate];
        chectRemainingTimer = nil;
    }
}

- (void)playVidio {
    if (audioPlayer) {
        [audioPlayer stop];
        audioPlayer = nil;
    }
    NSURL *filePathUrl = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"1" ofType:@"wav"]];
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback withOptions:AVAudioSessionCategoryOptionMixWithOthers error:nil];
    audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:filePathUrl error:nil];
    [audioPlayer play];
}

+ (void)enableBackgroundMode:(BOOL)enable {
    enableBgModel = enable;
    NSLog(@"APP后台模式状态：%@",enable?@"启动后台模式":@"关闭后台模式");
}

@end
