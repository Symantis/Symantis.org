angular.module( 'symantis.contact', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'ContactCtrl', function ContactController( $scope, titleService ) {
	titleService.setTitle('Contact');
})
.controller( 'ContactHeaderCtrl', function ContactHeaderController( $scope, titleService ) {
	//titleService.setTitle('Contact');
});