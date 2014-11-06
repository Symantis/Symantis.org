angular.module( 'symantis.me.information', [
])
.controller( 'InformationCtrl', function InformationController( $scope, titleService, user, UserDS ) {
	titleService.setTitle('My Information');
	$scope.$parent.toDo = ['Add Activity', 'link Manti', 'Link Contributions'];

	/*
	$scope.loadingSection = true;
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		//$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		$scope.loadingSection = false;
		
	});
	*/

	//$scope.loadingSection = true;
	//UserDS.find(user.id).then(function(){
	//	$scope.loadingSection = false;
	//});
	//UserDS.bindOne($rootScope, 'user', user.id);
	
})
.controller( 'MeInformationLeftsideCtrl', function MeInformationLeftsideController( $scope ) {
	//titleService.setTitle('About');
});