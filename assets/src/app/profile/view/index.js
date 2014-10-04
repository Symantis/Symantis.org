angular.module( 'symantis.profile.view', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ProfileViewCtrl', function ProfileViewController($http, $scope, user, titleService, $state, $stateParams, UserModel, cache) {
	
		
	$scope.user = user;

	var inCache = cache.checkUserCache($scope.cachedUsers, user.handle);
	if(inCache){
		$scope.user = cache.getCachedUser($scope.cachedUsers, user.handle);
	}else{
		$http.get('/api/user/handle/' + user.handle).then(function(res){
			$scope.user = res.data;
			cache.cacheNewUser($scope.cachedUsers, $scope.user);
		});
	}
	

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