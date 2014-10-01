angular.module( 'symantis.more.contributors', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ContributorsCtrl', function ContributorsController( $scope, titleService) {
	titleService.setTitle('Contributors');

})
.controller( 'ContributorsBoardCtrl', function ContributorsBoardController( $scope, SystemModel, commits) {

	$scope.commits = {}; 
	$scope.loading = true;

	SystemModel.getRecentCommits().then(function(data){
		$scope.loading = false;
		$scope.commits = data;
	});

})
.controller( 'ContributorsHeaderCtrl', function ContributorsHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'ContributorsLeftsideCtrl', function ContributorsLeftCsideontroller( $scope ) {
	//titleService.setTitle('About');
});