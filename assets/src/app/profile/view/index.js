angular.module( 'symantis.profile.view', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ProfileViewCtrl', function ProfileViewController($http, $scope, user, titleService, utils, UserHandleDS) {
	
	$scope.loadingSection = true;

	UserHandleDS.find(user.handle).then(function(model){
		//$scope.user = model;
		titleService.setTitle(model.firstName+'\'s' + ' Profile');
		$scope.loadingSection = false;
	});

	UserHandleDS.bindOne($scope, 'user', user.handle);
	

	
	/*
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		
		titleService.setTitle($scope.user.firstName+'\'s' + ' Profile');
		$scope.loadingSection = false;
		
	});
	*/

	//$scope.user = user;
	//$scope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
	//$scope.user.totalToConnections = $scope.user.totalToConnections - $scope.user.reciprocal;
	//$scope.user.totalFromConnections = $scope.user.totalFromConnections - $scope.user.reciprocal;
	/*
	$scope.user = UserModel.getOneHandle(user.handle).then(function(model){
		return model;
	});
	*/
	//cache.resolveUserCache($scope.users, user.handle);

	

	

})
.controller( 'ProfileViewLeftsideCtrl', function ProfileViewLeftsideController( $scope ) {
	
})
.controller( 'ProfileMessageCtrl', function ProfileMessageController( $scope ) {

})
.controller( 'ProfileConnectCtrl', function ProfileConnectController( $scope, utils, UserModel ) {

	$scope.connect = function(){
		var newModel = {
			id: $scope.currentUser.id,
			connect: $scope.$parent.user.id,
		}
		UserModel.connect(newModel).then(function(model){
			utils.sectionAlert($scope.alerts, { type: 'success',msg: 'You are now connected with '+ $scope.user.at + $scope.user.handle +'.' } );

		});
	}
});