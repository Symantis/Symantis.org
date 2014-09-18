angular.module( 'symantis.login', [
])

.config(function config( $stateProvider, $urlRouterProvider) {

	$stateProvider.state( 'register', {
		url: '/register',
		views: {
			"main": {
				controller: 'registerCtrl',
				templateUrl: 'register/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
                templateUrl: 'header/header.tpl.html'
			},
			"subheader@register": {
				controller: 'RegisterHeaderCtrl',
                templateUrl: 'register/header.tpl.html'
			}
		}
	});
})

.controller( 'RegisterCtrl', function RegisterController( $scope, titleService ) {
	titleService.setTitle('Register');
})
.controller( 'RegisterHeaderCtrl', function RegisterHeaderController( $scope ) {

});