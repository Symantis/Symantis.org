angular.module( 'symantis.me', [

])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'me', {
			url: '/me',
			views: {
				"main": {
					controller: 'MeCtrl',
					templateUrl: 'me/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				},
				"header": {
					controller: 'HeaderCtrl',
	                templateUrl: 'header/header.tpl.html'
				},
				"subheader@me": {
					controller: 'MeHeaderCtrl',
                	templateUrl: 'me/header.tpl.html'
				},
				"leftside@profile": {
					controller: 'MeLeftsideCtrl',
					templateUrl: 'me/leftside.tpl.html'
				}
			}
		})
	;
})

.controller( 'MeCtrl', function ProfileController( $scope, titleService ) {
	titleService.setTitle('Me');

	
})
.controller( 'MeHeaderCtrl', function MeHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'MeLeftsideCtrl', function MeLeftsideController( $scope ) {
	//titleService.setTitle('About');
});