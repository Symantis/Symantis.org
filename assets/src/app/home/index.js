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
			}
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, titleService ) {
	titleService.setTitle('Home');
});