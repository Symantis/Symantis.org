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
.controller( 'BoardViewCtrl', function NewsViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.opportunities){
		if ($scope.opportunities[i].id == $stateParams.id){
			$scope.board = $scope.opportunities[i];
			break;
		};
	}

	titleService.setTitle('Opportunities: ' + $scope.board.title);

})
.controller( 'BoardNewCtrl', function BoardNewController( $scope, titleService ) {

	titleService.setTitle('New Opportunity');

	
})
.controller( 'CommunityBoardLeftsideCtrl', function CommunityBoardLeftsideController( $scope ) {
	//titleService.setTitle('About');
});