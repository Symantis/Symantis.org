angular.module( 'symantis.me.sykit', [
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
.controller( 'SykitCtrl', function SykitController( $scope, titleService ) {
	titleService.setTitle('My Manti');

	
})
.controller( 'SykitLeftsideCtrl', function SykitLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'SykitLeftsideCtrl', function SykitLeftsideController( $scope ) {
	//titleService.setTitle('About');
});