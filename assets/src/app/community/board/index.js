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
.controller( 'BoardCtrl', function BoardController( $scope, titleService, utils ) {
	titleService.setTitle('Board');
	$scope.$parent.toDo = [];

	$scope.remove = function(id){
		console.log("tile: "+id);
		utils.removeTile($scope.opportunities, id);
	}

})
.controller( 'BoardViewCtrl', function BoardViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.opportunities){
		if ($scope.opportunities[i].id == $stateParams.id){
			$scope.board = $scope.opportunities[i];
			break;
		};
	}

	titleService.setTitle('Opportunities: ' + $scope.board.title);
	$scope.$parent.toDo = [];

})
.controller( 'BoardNewCtrl', function BoardNewController( $scope, titleService ) {

	titleService.setTitle('New Opportunity');

	
})
.controller( 'CommunityBoardLeftsideCtrl', function CommunityBoardLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'CommunityBoardNavCtrl', function CommunityBoardNavController( $scope ) {
	//titleService.setTitle('About');
});