angular.module( 'symantis.profile.information', [
])


.controller( 'ProfileInformationCtrl', function ProfileInformationController($http, $scope, user, titleService, $state, $stateParams, UserModel, cache, utils) {
	
	$scope.user = user;
	$scope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
	//$scope.user.totalToConnections = $scope.user.totalToConnections - $scope.user.reciprocal;
	//$scope.user.totalFromConnections = $scope.user.totalFromConnections - $scope.user.reciprocal;
	/*
	$scope.user = UserModel.getOneHandle(user.handle).then(function(model){
		return model;
	});
	*/
	//cache.resolveUserCache($scope.users, user.handle);

	titleService.setTitle('Information');

	

})
.controller( 'ProfileInformationLeftsideCtrl', function ProfileActivityLeftsideController( $scope ) {
	
});