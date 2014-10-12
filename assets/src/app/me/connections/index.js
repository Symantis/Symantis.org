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
.controller( 'ConnectionsCtrl', function ConnectionsController( $scope, titleService, UserModel ) {
	titleService.setTitle('Connections');
	$scope.$parent.toDo = ['Add Cache feature', 'Add Filter'];

	$scope.loadingSection = true;
	//console.log($scope.currentUser);
	UserModel.getConnections($scope.currentUser.id).then(function(connections){
		$scope.user.connections = connections;
		$scope.loadingSection = false;
	});

	
})
.controller( 'MeConnectionsLeftsideCtrl', function MeConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'MeConnectionsLeftsideCtrl', function MeConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});