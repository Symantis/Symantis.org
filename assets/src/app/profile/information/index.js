angular.module( 'symantis.profile.information', [
])

.controller( 'ProfileInformationCtrl', function ProfileInformationController($scope, $rootScope, titleService, $state, $stateParams, cache, utils, user) {
	
	titleService.setTitle('Information');
	$scope.loadingSection = true;
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		
		titleService.setTitle($scope.user.firstName+'\'s' + ' Information');
		$scope.loadingSection = false;
		
	});

})

.controller( 'ProfileInformationLeftsideCtrl', function ProfileActivityLeftsideController( $scope ) {
	
})