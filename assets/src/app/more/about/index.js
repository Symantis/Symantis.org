angular.module( 'symantis.about', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'AboutCtrl', function AboutController( $scope, titleService ) {
	titleService.setTitle('About');
})
.controller( 'AboutHeaderCtrl', function AboutHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
});