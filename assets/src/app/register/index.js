angular.module( 'symantis.register', [

])


.config(function config( $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/register', '/register/email');

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
				},
				"footer": {
					controller: 'FooterCtrl',
	                template: ''
				}
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
		.state( 'register.confirmpassword', {
			url: '/confirm_password',
			views: {
				"register@register": {
					templateUrl: 'register/form/confirmPassword.tpl.html'
				}
			}
		})
		.state( 'register.firstname', {
			url: '/first_name',
			views: {
				"register@register": {
					templateUrl: 'register/form/firstName.tpl.html'
				}
			}
		})
		.state( 'register.lastname', {
			url: '/last_name',
			views: {
				"register@register": {
					templateUrl: 'register/form/lastName.tpl.html'
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



.controller( 'RegisterCtrl', function RegisterController( $scope, $state, titleService ) {
	titleService.setTitle('Register');
	$scope.$parent.toDo = [];
	
	$scope.registerData = {
		email : '',
		username: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: ''
	};

	$scope.nextStep = function(field, state){
		console.log(field);
		if(field.$valid){
			$state.go('register.'+state);
		}
	}

})
.controller( 'RegisterHeaderCtrl', function RegisterHeaderController( $scope ) {

});