angular.module( 'symantis.me.information', [
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
.controller( 'InformationCtrl', function InformationController( $scope, $rootScope, titleService, user, cache ) {
	titleService.setTitle('My Information');
	$scope.$parent.toDo = [];

	$scope.loadingSection = true;
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		$scope.loadingSection = false;
		
	});
	
})
.controller( 'MeInformationLeftsideCtrl', function MeInformationLeftsideController( $scope ) {
	//titleService.setTitle('About');
});