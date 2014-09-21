angular.module( 'symantis.register', [

])


.config(function config( $stateProvider, $urlRouterProvider) {

	$stateProvider.state( 'register', {
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
	});
})



.controller( 'RegisterCtrl', function RegisterController( $scope, titleService ) {
	titleService.setTitle('Register');
})
.controller( 'RegisterHeaderCtrl', function RegisterHeaderController( $scope ) {

});