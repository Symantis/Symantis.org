angular.module( 'symantis.profile.activity', [
])

.controller( 'ProfileActivityCtrl', function ProfileActivityController($scope, titleService, $state, $stateParams) {
	
	titleService.setTitle('Activity');

})
.controller( 'ProfileActivityLeftsideCtrl', function ProfileActivityLeftsideController( $scope ) {
	
})