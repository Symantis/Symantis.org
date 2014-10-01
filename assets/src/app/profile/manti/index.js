angular.module( 'symantis.profile.manti', [
])

.controller( 'ProfileMantiCtrl', function ProfileMantiController($scope, titleService, $state, $stateParams) {
	
	titleService.setTitle('Manti');

})
.controller( 'ProfileMantiLeftsideCtrl', function ProfileMantiLeftsideController( $scope ) {
	
})