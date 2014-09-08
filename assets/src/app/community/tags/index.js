angular.module( 'symantis.community.tags', [
])

.controller( 'TagsCtrl', function TagsController( $scope, titleService, $state, $stateParams ) {
	titleService.setTitle('Tag: Not Found');
	$scope.tag = $stateParams.tag;
	
})
.controller( 'TagsViewCtrl', function TagsViewController( $scope, titleService, $state, $stateParams ) {
	titleService.setTitle('Tag: ' + $stateParams.tag );
	$scope.tag = $stateParams.tag;
	
});