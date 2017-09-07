//
//  SFAppStatusManager.h
//  SofficeMoi
//
//  Created by Eayon on 16/12/9.
//  Copyright © 2016年 Soffice. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface SFAppStatusManager : NSObject

+ (void)processAppEnterBackgroup;
+ (void)registerObserver:(id)observer appEnterBackgroupBlock:(void (^)())block;
+ (void)removeAppEnterBackgroupObserver:(id)observer;

+ (void)processAppWillEnterForeground;
+ (void)registerObserver:(id)observer appWillEnterForegroundBlock:(void (^)())block;
+ (void)removeAppWillEnterForegroundObserver:(id)observer;

@end
