angular.module( 'symantis.community.connections', [
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
.controller( 'ConnectionsCtrl', function ConnectionsController( $scope, titleService ) {
	titleService.setTitle('Connections');

	
})
.controller( 'CommunityConnectionsLeftsideCtrl', function CommunityConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'CommunityConnectionsLeftsideCtrl', function CommunityConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});