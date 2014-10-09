angular.module( 'symantis.me.manti', [
])

.controller( 'MantiCtrl', function MantiController( $scope, titleService ) {
	titleService.setTitle('My Manti');
	$scope.$parent.toDo = ['Hook up left classes', 'Add new class modal', 'Create new modal', 'Open in CA modal'];
	
})
.controller( 'MantiViewCtrl', function MantiViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.mantis){
		if ($scope.mantis[i].id == $stateParams.id){
			$scope.manti = $scope.mantis[i];
			break;
		};
	}

	titleService.setTitle('Manti: ' + $scope.manti.title);

	$scope.$parent.toDo = [];
	
})

.controller( 'MeMantiNavCtrl', function MeMantiNavController( $scope ) {
	//titleService.setTitle('About');
})

.controller( 'MeMantiLeftsideCtrl', function MeMantiLeftsideController( $scope ) {
	//titleService.setTitle('About');
});