angular.module( 'symantis.more.contributors', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ContributorsCtrl', function ContributorsController( $scope, titleService) {
	titleService.setTitle('Contributors');


})
.controller( 'ContributorsBoardCtrl', function ContributorsBoardController( $scope, commits, SystemDS) {
	$scope.$parent.toDo = [];
	
	//$scope.commits = {}; 
	$scope.loadingSection = true;
	
	SystemDS.findAll().then(function(){
		$scope.loadingSection = false;
		SystemDS.bindAll($scope, 'commits');
	});

	/*
	SystemModel.getRecentCommits().then(function(data){
		$scope.loadingSection = false;
		$scope.commits = data;
		console.log(data);
	});
	*/
	
})
.controller( 'ContributorsHeaderCtrl', function ContributorsHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'ContributorsLeftsideCtrl', function ContributorsLeftCsideontroller( $scope ) {
	//titleService.setTitle('About');
});