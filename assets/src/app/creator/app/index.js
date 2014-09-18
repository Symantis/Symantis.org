angular.module( 'symantis.creator.app', [

])
.controller( 'CreatorAppCtrl', function CreatorAppController( $scope, titleService ) {
	titleService.setTitle('Creator App');

	
});