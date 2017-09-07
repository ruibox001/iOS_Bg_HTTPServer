//
//  SFAppStatusManager.m
//  SofficeMoi
//
//  Created by Eayon on 16/12/9.
//  Copyright © 2016年 Soffice. All rights reserved.
//

#import "SFAppStatusManager.h"
#import "SFAppStatusModel.h"

@interface SFAppStatusManager ()

@property (strong, nonatomic) NSMutableArray *backGroupBlocks;
@property (strong, nonatomic) NSMutableArray *foregroundBlocks;

@end

@implementation SFAppStatusManager

- (NSMutableArray *)backGroupBlocks {
    if (!_backGroupBlocks) {
        _backGroupBlocks = [NSMutableArray array];
    }
    return _backGroupBlocks;
}

- (NSMutableArray *)foregroundBlocks {
    if (!_foregroundBlocks) {
        _foregroundBlocks = [NSMutableArray array];
    }
    return _foregroundBlocks;
}

+ (SFAppStatusManager *)appInstance
{
    static SFAppStatusManager *item;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        item = [[SFAppStatusManager alloc]init];
    });
    return item;
}

- (BOOL)observerIsExistWithObserver:(NSString *)k backgroup:(BOOL)backgroup
{
    if (backgroup) {
        for (SFAppStatusModel *model in self.backGroupBlocks) {
            if ([model.appStatusKey isEqualToString:k]) {
                return YES;
            }
        }
    }
    else {
        for (SFAppStatusModel *model in self.foregroundBlocks) {
            if ([model.appStatusKey isEqualToString:k]) {
                return YES;
            }
        }
    }
    return NO;
}

+ (NSString *)observerClassName:(id)observer
{
    return NSStringFromClass([observer class]);
}

/**************************************************************************************************/
+ (void)processAppEnterBackgroup {
    for (SFAppStatusModel *model in [self appInstance].backGroupBlocks) {
        if (model.appStatusBlock) {
            model.appStatusBlock();
        }
    }
}
+ (void)registerObserver:(id)observer appEnterBackgroupBlock:(void (^)())block {
    
    if (![observer isKindOfClass:[UIViewController class]]) {
        NSLog(@"注册进入后台不是ViewController，注销时请自行调用[SFAppStatusManager removeAppEnterBackgroupObserver:self]方法");
    }
    
    if (block && observer) {
        NSString *key = [self observerClassName:observer];
        if ([[self appInstance] observerIsExistWithObserver:key backgroup:YES]) {
            NSString *log = [NSString stringWithFormat:@"ERROR >> 该[%@]类只能监听一个Backgroup回调，不能重复监听",key];
            NSAssert(NO,log);
            return;
        }
        SFAppStatusModel *model = [[SFAppStatusModel alloc] initWithKey:key block:block];
        [[self appInstance].backGroupBlocks addObject:model];
    }
}
+ (void)removeAppEnterBackgroupObserver:(id)observer {
    if (observer) {
        NSString *k = [self observerClassName:observer];
        for (SFAppStatusModel *model in [self appInstance].backGroupBlocks) {
            if ([model.appStatusKey isEqualToString:k]) {
                [[self appInstance].backGroupBlocks removeObject:model];
                break;
            }
        }
    }
}

/**************************************************************************************************/
+ (void)processAppWillEnterForeground {
    for (SFAppStatusModel *model in [self appInstance].foregroundBlocks) {
        if (model.appStatusBlock) {
            model.appStatusBlock();
        }
    }
}
+ (void)registerObserver:(id)observer appWillEnterForegroundBlock:(void (^)())block {
    if (![observer isKindOfClass:[UIViewController class]]) {
        NSLog(@"注册进入后台不是ViewController，注销时请自行调用[SFAppStatusManager removeAppEnterBackgroupObserver:self]方法");
    }
    if (block && observer) {
        NSString *key = [self observerClassName:observer];
        if ([[self appInstance] observerIsExistWithObserver:key backgroup:NO]) {
            NSString *log = [NSString stringWithFormat:@"ERROR >> 该[%@]类只能监听一个Backgroup回调，不能重复监听",key];
            NSAssert(NO,log);
            return;
        }
        SFAppStatusModel *model = [[SFAppStatusModel alloc] initWithKey:key block:block];
        [[self appInstance].foregroundBlocks addObject:model];
    }
}
+ (void)removeAppWillEnterForegroundObserver:(id)observer {
    if (observer) {
        NSString *k = [self observerClassName:observer];
        for (SFAppStatusModel *model in [self appInstance].foregroundBlocks) {
            if ([model.appStatusKey isEqualToString:k]) {
                [[self appInstance].foregroundBlocks removeObject:model];
                break;
            }
        }
    }
}

@end
