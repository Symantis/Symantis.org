angular.module( 'symantis.community.queries', [
])
/*
.config(function config( $stateProvider ) {
	$stateProvider.state( 'queries', {
		url: '/queries',
		views: {
			"main": {
				controller: 'QueriesCtrl',
				templateUrl: 'queries/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})
*/
.controller( 'QueriesCtrl', function QueriesController( $scope, titleService ) {
	titleService.setTitle('Queries');

	
})
.controller( 'QueriesViewCtrl', function QueriesViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.queries){
		if ($scope.queries[i].id == $stateParams.id){
			$scope.query = $scope.queries[i];
			break;
		};
	}

	titleService.setTitle('Query: ' + $scope.query.title);

	
})
.controller( 'QueriesNewCtrl', function QueriesNewController( $scope, titleService ) {

	titleService.setTitle('New Query');

	
})
.controller( 'CommunityQueriesLeftsideCtrl', function CommunityQueriesLeftsideController( $scope ) {
	//titleService.setTitle('About');
});