angular.module( 'symantis.profile.connections', [
])

.controller( 'ProfileConnectionsCtrl', function ProfileConnectionsController($scope, $rootScope, titleService, $state, $stateParams, utils, user, UserHandleDS) {
	$scope.$parent.toDo = [];
	titleService.setTitle('Connections');


	$scope.loadingSection = true;

	UserHandleDS.find(user.handle).then(function(model){
		//$scope.user = model;
		titleService.setTitle(model.firstName+'\'s' + ' Profile');
		$scope.loadingSection = false;
	});

	UserHandleDS.bindOne($scope, 'user', user.handle);
	/*
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
	*/

})
.controller( 'ProfileConnectionsLeftsideCtrl', function ProfileConnectionsLeftsideController( $scope ) {
	
})