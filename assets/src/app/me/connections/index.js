angular.module( 'symantis.me.connections', [
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
.controller( 'ConnectionsCtrl', function ConnectionsController( $scope, titleService, UserModel, user, UserDS ) {
	titleService.setTitle('Connections');
	$scope.$parent.toDo = ['Add Cache feature', 'Add Filter'];

	/*
	$scope.loadingSection = true;
	
	UserDS.find(user.id).then(function(){
		$scope.loadingSection = false;
	});
	UserDS.bindOne($rootScope, 'user', user.id);
	*/
	//$scope.loadingSection = true;
	//console.log($scope.currentUser);
	/*
	UserModel.getConnections($scope.currentUser.id).then(function(connections){
		$scope.user.connections = connections;
		$scope.loadingSection = false;
	});
	*/
	/*
	cache.resolveUserConnectionsCache($rootScope.users, user).then(function(connections){
		$rootScope.user.connections = connections;
		$scope.loadingSection = false;
	});
	*/

	$scope.getConnectionType = function(id){
		return utils.getConnectionType(id, $rootScope.user.toConnections, $rootScope.user.fromConnections);

	}
	
})
.controller( 'MeConnectionsLeftsideCtrl', function MeConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'MeConnectionsLeftsideCtrl', function MeConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});