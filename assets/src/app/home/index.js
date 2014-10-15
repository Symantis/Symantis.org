angular.module( 'symantis.home', [
])

.config(function config( $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/home');

	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"footer": {
				controller: 'FooterCtrl',
                templateUrl: 'footer/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
                templateUrl: 'home/header.tpl.html'
			},
			"subheader@home": {
				controller: 'HomeHeaderCtrl',
                templateUrl: ''
			}
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, titleService ) {
	titleService.setTitle('Home');
	$scope.$parent.notificationsOpen = false;
	$scope.$parent.toDo = [];

})
.controller( 'HomeHeaderCtrl', function HomeHeaderController( $scope, titleService ) {
	titleService.setTitle('Home');
});