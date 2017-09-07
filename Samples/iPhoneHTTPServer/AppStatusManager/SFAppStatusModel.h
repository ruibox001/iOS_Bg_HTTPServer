//
//  SFTimerModel.h
//  TimerManager
//
//  Created by 王声远 on 2017/6/26.
//  Copyright © 2017年 王声远. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SFAppStatusModel : NSObject

@property (nonatomic,copy) void (^appStatusBlock)();
@property (nonatomic,strong,readonly) NSString *appStatusKey;

- (instancetype) initWithKey:(NSString *)key block:(void (^)())block;

@end
