angular.module( 'symantis.more.contact', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ContactCtrl', function ContactController( $scope, titleService ) {
	titleService.setTitle('SyKit');
})
.controller( 'ContactHeaderCtrl', function ContactHeaderController( $scope, titleService ) {
	//titleService.setTitle('Contact');
})
.controller( 'ContactLeftsideCtrl', function ContactLeftsideController( $scope ) {
	//titleService.setTitle('About');
});