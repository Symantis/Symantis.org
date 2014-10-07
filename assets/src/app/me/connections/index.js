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
.controller( 'ConnectionsCtrl', function ConnectionsController( $scope, titleService ) {
	titleService.setTitle('Connections');
	$scope.$parent.toDo = [];
	
})
.controller( 'MeConnectionsLeftsideCtrl', function MeConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'MeConnectionsLeftsideCtrl', function MeConnectionsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});