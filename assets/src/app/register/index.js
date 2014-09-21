angular.module( 'symantis.register', [

])


.config(function config( $stateProvider, $urlRouterProvider) {

	$stateProvider
		.state( 'register', {
			url: '/register',
			views: {
				"main": {
					controller: 'RegisterCtrl',
					templateUrl: 'register/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				},
				"header": {
					controller: 'RegisterHeaderCtrl',
	                templateUrl: 'register/header.tpl.html'
				}

				/*
				,
				"subheader@register": {
					controller: 'RegisterHeaderCtrl',
	                templateUrl: 'register/header.tpl.html'
				}
				*/
			}
		})
		.state( 'register.email', {
			url: '/email',
			views: {
				"register@register": {
					templateUrl: 'register/form/email.tpl.html'
				}
			}
		})
		.state( 'register.username', {
			url: '/username',
			views: {
				"register@register": {
					templateUrl: 'register/form/username.tpl.html'
				}
			}
		})
		.state( 'register.password', {
			url: '/password',
			views: {
				"register@register": {
					templateUrl: 'register/form/password.tpl.html'
				}
			}
		})
		.state( 'register.name', {
			url: '/name',
			views: {
				"register@register": {
					templateUrl: 'register/form/name.tpl.html'
				}
			}
		})
		.state( 'register.confirm', {
			url: '/confirm',
			views: {
				"register@register": {
					templateUrl: 'register/form/confirm.tpl.html'
				}
			}
		})
	;
	$urlRouterProvider.otherwise('/register/email');
})



.controller( 'RegisterCtrl', function RegisterController( $scope, titleService ) {
	titleService.setTitle('Register');

	$scope.registerData = {
		email : '',
		username: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: ''
	};

})
.controller( 'RegisterHeaderCtrl', function RegisterHeaderController( $scope ) {

});