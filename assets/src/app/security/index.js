angular.module( 'symantis.security', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'security', {
		url: '/security',
		views: {
			"main": {
				controller: 'SecurityCtrl',
				templateUrl: 'security/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
				templateUrl: 'header/header.tpl.html'
			},
			"subheader@security": {
				controller: 'SecurityHeaderCtrl',
                templateUrl: 'security/header.tpl.html'
			},
			"leftside@security": {
				controller: 'SecurityLeftsideCtrl',
                templateUrl: 'security/leftside.tpl.html'
			}
		}
	});
})

.controller( 'SecurityCtrl', function SecurityController( $scope, titleService ) {
	titleService.setTitle('Security');

	
})
.controller( 'SecurityHeaderCtrl', function SecurityHeaderController( $scope, titleService ) {
	//titleService.setTitle('Docs');

	
})
.controller( 'SecurityLeftsideCtrl', function SecurityLeftsideController( $scope ) {
	//titleService.setTitle('Docs');

	
});