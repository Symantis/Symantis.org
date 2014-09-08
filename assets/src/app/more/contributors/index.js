angular.module( 'symantis.more.contributors', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ContributorsCtrl', function ContributorsController( $scope, titleService ) {
	titleService.setTitle('Contributors');
})
.controller( 'ContributorsHeaderCtrl', function ContributorsHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'ContributorsLeftsideCtrl', function ContributorsLeftCsideontroller( $scope ) {
	//titleService.setTitle('About');
});