angular.module( 'symantis.profile.manti', [
])

.controller( 'ProfileMantiCtrl', function ProfileMantiController($scope, titleService, $state, $stateParams) {
	//$scope.user = user;
	titleService.setTitle('Manti');

})

.controller( 'ProfileMantiViewCtrl', function MantiViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.mantis){
		if ($scope.mantis[i].id == $stateParams.id){
			$scope.manti = $scope.mantis[i];
			break;
		};
	}

	titleService.setTitle('Manti: ' + $scope.manti.title);

	$scope.$parent.toDo = [];
	
})

.controller( 'ProfileMantiNavCtrl', function MeMantiNavController( $scope ) {
	//titleService.setTitle('About');
})

.controller( 'ProfileMantiLeftsideCtrl', function ProfileMantiLeftsideController( $scope ) {
	
});