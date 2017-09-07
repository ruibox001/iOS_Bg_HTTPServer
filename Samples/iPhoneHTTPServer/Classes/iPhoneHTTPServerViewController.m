#import "iPhoneHTTPServerViewController.h"


@implementation iPhoneHTTPServerViewController

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    NSLog(@"viewWillAppear");
    
    self.view.backgroundColor = [UIColor whiteColor];
}

@end
