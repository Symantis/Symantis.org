angular.module( 'symantis.sitenav', [
])

.config(function config( $stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.when('', '/');

    $stateProvider.state( '*', {
        url: '/*',
        views: {
            "sitenav": {
                controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
            }
        }
    });
})

.controller( 'SiteNavCtrl', function SiteNavController( $scope, $state, config ) {

    var siteItems = [
        {title: 'Home', translationKey: 'navigation:docs', url:'/home', sref:'home'},
        {title: 'Get Started', translationKey: 'navigation:start', url:'/start', sref:'start'},
        {title: 'Community', translationKey: 'navigation:community', url:'/community', sref:'community'},
        {title: 'Documentation', translationKey: 'navigation:docs', url:'/docs', sref:'docs'},
        {title: 'More', translationKey: 'navigation:more', url:'/more', sref:'more'},
        {title: 'Creator App', translationKey: 'navigation:creator', url:'/creator', sref:'creator'}
    ];

    $scope.siteItems = siteItems;
});