angular.module( 'symantis.profile.view', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ProfileViewCtrl', function ProfileViewController($http, $scope, user, titleService, $state, $stateParams, UserModel) {
	
		
	$scope.user = user;

	$http.get('/api/user/handle/' + user.handle).then(function(res){
		console.log(res.data);
		$scope.user = res.data;
	});
	

	titleService.setTitle($scope.user.firstName+'\'s' + ' Profile');
	
	/*
	for(var i in $scope.users){
		
		if($scope.users[i].handle == $stateParams.handle){
			
			$scope.user = $scope.users[i];
			//console.log($scope.user);
			titleService.setTitle($scope.user.firstName+'\'s' + ' Profile');
			break;
		}
		//console.log($stateParams.handle+' '+$scope.users[i].handle);
	}
	*/


})
.controller( 'ProfileViewLeftsideCtrl', function ProfileViewLeftsideController( $scope ) {
	
})
.controller( 'ProfileMessageCtrl', function ProfileMessageController( $scope ) {

})
.controller( 'ProfileConnectCtrl', function ProfileConnectController( $scope ) {

})
.controller( 'ProfileInviteCtrl', function ProfileInviteController( $scope ) {

});