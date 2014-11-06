angular.module( 'symantis.profile.information', [
])

.controller( 'ProfileInformationCtrl', function ProfileInformationController($scope, $rootScope, titleService, $state, $stateParams, utils, user, UserHandleDS) {
	$scope.$parent.toDo = ['Add Activity', 'link Manti', 'Link Contributions'];
	titleService.setTitle('Information');
	
	$scope.loadingSection = true;

	UserHandleDS.find(user.handle).then(function(model){
		//$scope.user = model;
		titleService.setTitle(model.firstName+'\'s' + ' Connections');
		$scope.loadingSection = false;
	});

	UserHandleDS.bindOne($scope, 'user', user.handle);

})

.controller( 'ProfileInformationLeftsideCtrl', function ProfileActivityLeftsideController( $scope ) {
	
})