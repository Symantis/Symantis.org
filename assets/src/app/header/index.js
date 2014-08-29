angular.module( 'symantis.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [
        {title: 'Messages', translationKey: 'navigation:messages', url: '/messages', cssClass: 'fa fa-comments'},
        //{title: 'About', translationKey: 'navigation:about', url:'/about',cssClass: 'fa fa-info-circle'},
        {title: 'Kitchen', translationKey: 'navigation:kitchen', url:'/kitchen',cssClass: 'fa fa-info-circle'},
        {title: 'Template', translationKey: 'navigation:template', url:'/template',cssClass: 'fa fa-info-circle'},
        //{title: 'Docs', translationKey: 'navigation:docs', url:'/docs',cssClass: 'fa fa-info-circle'},
        //{title: 'Community', translationKey: 'navigation:community', url:'/community',cssClass: 'fa fa-info-circle'},
        //{title: 'Creator', translationKey: 'navigation:creator', url:'/creator',cssClass: 'fa fa-info-circle'},
        //{title: 'Start', translationKey: 'navigation:start', url:'/start',cssClass: 'fa fa-info-circle'}
    ];

    if (!$scope.currentUser) {
        navItems.push({title: 'Register', translationKey: 'navigation:register', url: '/register', cssClass: 'fa fa-briefcase'});
        navItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', cssClass: 'fa fa-comments'});
    }

    $scope.navItems = navItems;
});