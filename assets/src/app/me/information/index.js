angular.module( 'symantis.me.information', [
])
.controller( 'InformationCtrl', function InformationController( $scope, $rootScope, titleService, user, cache ) {
	titleService.setTitle('My Information');
	$scope.$parent.toDo = ['Add Activity', 'link Manti', 'Link Contributions'];

	$scope.loadingSection = true;
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		//$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		$scope.loadingSection = false;
		
	});
	
})
.controller( 'MeInformationLeftsideCtrl', function MeInformationLeftsideController( $scope ) {
	//titleService.setTitle('About');
});