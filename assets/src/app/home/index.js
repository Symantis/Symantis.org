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
                template: ''
			},
			"header": {
				controller: 'HeaderCtrl',
                template: ''
			},
			"subheader@home": {
				controller: 'HomeHeaderCtrl',
                templateUrl: 'home/header.tpl.html'
			}
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, titleService ) {
	titleService.setTitle('Home');
	
	$scope.$parent.toDo = ['Make Animation','Add login form'];

})
.controller( 'HomeHeaderCtrl', function HomeHeaderController( $scope, titleService ) {
	titleService.setTitle('Home');
});