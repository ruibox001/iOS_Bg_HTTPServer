//
//  SFTimerModel.m
//  TimerManager
//
//  Created by 王声远 on 2017/6/26.
//  Copyright © 2017年 王声远. All rights reserved.
//

#import "SFAppStatusModel.h"

@implementation SFAppStatusModel

- (instancetype) initWithKey:(NSString *)key block:(void (^)())block
{
    self = [super init];
    if (self) {
        _appStatusKey = key;
        _appStatusBlock = block;
    }
    return self;
}
@end
