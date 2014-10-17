angular.module( 'symantis.profile.connections', [
])

.controller( 'ProfileConnectionsCtrl', function ProfileConnectionsController($scope, $rootScope, titleService, $state, $stateParams, cache, utils, user) {
	$scope.$parent.toDo = [];
	titleService.setTitle('Connections');

	$scope.loadingSection = true;
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		
		titleService.setTitle($scope.user.firstName+'\'s' + ' Connections');
		
		cache.resolveUserConnectionsCache($rootScope.users, $rootScope.user).then(function(connections){
			$rootScope.user.connections = connections;
			$scope.loadingSection = false;
		});
		//$scope.loadingSection = false;
		
	});

})
.controller( 'ProfileConnectionsLeftsideCtrl', function ProfileConnectionsLeftsideController( $scope ) {
	
})