angular.module( 'symantis.community.board', [
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
.controller( 'BoardCtrl', function BoardController( $scope, titleService ) {
	titleService.setTitle('Board');

	
})
.controller( 'CommunityBoardLeftsideCtrl', function CommunityBoardLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'CommunityBoardLeftsideCtrl', function CommunityBoardLeftsideController( $scope ) {
	//titleService.setTitle('About');
});