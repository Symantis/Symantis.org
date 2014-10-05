angular.module( 'symantis.profile.view', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ProfileViewCtrl', function ProfileViewController($http, $scope, user, titleService, $state, $stateParams, UserModel, cache) {
	
	$scope.user = user;
	$scope.user = cache.resolveUserCache($scope.users, user.handle);

	titleService.setTitle($scope.user.firstName+'\'s' + ' Profile');

	

})
.controller( 'ProfileViewLeftsideCtrl', function ProfileViewLeftsideController( $scope ) {
	
})
.controller( 'ProfileMessageCtrl', function ProfileMessageController( $scope ) {

})
.controller( 'ProfileConnectCtrl', function ProfileConnectController( $scope ) {

})
.controller( 'ProfileInviteCtrl', function ProfileInviteController( $scope ) {

});