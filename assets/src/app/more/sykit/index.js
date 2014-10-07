angular.module( 'symantis.more.sykit', [
])

.config(function config( $stateProvider ) {
	
})

.controller( 'SykitCtrl', function SykitController( $scope, titleService ) {
	titleService.setTitle('SyKit');
	$scope.$parent.toDo = [];
})
.controller( 'SykitHeaderCtrl', function SykitHeaderController( $scope, titleService ) {
	//titleService.setTitle('Contact');
})
.controller( 'SykitLeftsideCtrl', function SykitLeftsideController( $scope ) {
	//titleService.setTitle('About');
});