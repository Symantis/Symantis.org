angular.module( 'symantis.profile.view', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ProfileViewCtrl', function ProfileViewController($http, $scope, user, titleService, $state, $stateParams, UserModel, cache, utils) {
	
	$scope.user = user;
	$scope.user.reciprocal = utils.finduserMatches($scope.user.totalToConnections, $scope.user.totalFromConnections );
	/*
	$scope.user = UserModel.getOneHandle(user.handle).then(function(model){
		return model;
	});
	*/
	//cache.resolveUserCache($scope.users, user.handle);

	titleService.setTitle($scope.user.firstName+'\'s' + ' Profile');

	

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
})
.controller( 'ProfileInviteCtrl', function ProfileInviteController( $scope ) {

});