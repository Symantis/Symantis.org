angular.module( 'symantis.login', [
])

.config(function config( $stateProvider, $urlRouterProvider) {

	$stateProvider
		.state( 'login', {
			url: '/login',
			views: {
				"main": {
					controller: 'LoginCtrl',
					templateUrl: 'login/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				},
				"header": {
					controller: 'HeaderCtrl',
	                template: ''
				},
				"subheader@login": {
					controller: 'LoginHeaderCtrl',
	                templateUrl: 'login/header.tpl.html'
				}
			}
		})
		.state( 'login.forgot', {
			url: '/forgot',
			views: {
				"main@": {
					controller: 'LoginForgotCtrl',
					templateUrl: 'login/forgot.tpl.html'
				}
			}
		})
	;
})

.controller( 'LoginCtrl', function LoginController( $scope, titleService ) {
	titleService.setTitle('Login');
})
.controller( 'LoginForgotCtrl', function LoginForgotController( $scope, titleService ) {
	titleService.setTitle('Forgot Password');
})
.controller( 'LoginHeaderCtrl', function LoginHeaderController( $scope ) {

});