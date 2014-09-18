angular.module( 'symantis.me.manti', [
])
/*
.config(function config( $stateProvider ) {
	$stateProvider.state( 'connections', {
		url: '/connections',
		views: {
			"main": {
				controller: 'ConnectionsCtrl',
				templateUrl: 'connections/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})
*/
.controller( 'MantiCtrl', function MantiController( $scope, titleService ) {
	titleService.setTitle('My Manti');

	
})
.controller( 'MeMantiLeftsideCtrl', function MeMantiLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'MeMantiLeftsideCtrl', function MeMantiLeftsideController( $scope ) {
	//titleService.setTitle('About');
});