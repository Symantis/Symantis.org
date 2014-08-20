angular.module( 'symantis.tags', [
])

.controller( 'TagsCtrl', function TagsController( $scope, titleService, $state, $stateParams ) {
	titleService.setTitle('Queries');
	$scope.tag = $stateParams.tag
	
});