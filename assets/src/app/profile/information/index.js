angular.module( 'symantis.profile.information', [
])

.controller( 'ProfileInformationCtrl', function ProfileInformationController($scope, titleService, $state, $stateParams) {
	
	titleService.setTitle('Information');

})

.controller( 'ProfileInformationLeftsideCtrl', function ProfileActivityLeftsideController( $scope ) {
	
})