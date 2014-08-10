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
        {title: 'Home', translationKey: 'navigation:docs', url:'/home'},
        {title: 'Getting Started', translationKey: 'navigation:start', url:'/start'},
        {title: 'Documentation', translationKey: 'navigation:docs', url:'/docs'},
        {title: 'Community', translationKey: 'navigation:community', url:'/community'},
        {title: 'Web App', translationKey: 'navigation:creator', url:'/creator'}
        
    ];

    $scope.siteItems = siteItems;
});