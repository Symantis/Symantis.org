angular.module( 'symantis.global.modals', [

])
.controller( 'LoginModalCtrl', function LoginModalController($scope, $location, $modalInstance){

	$scope.refer = $location.path();

	console.log($scope.refer);

	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

})
.controller( 'OpportunityHelpModalCtrl', function OpportunityHelpModalController($scope, $modalInstance){

	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

})
.controller( 'SearchModalCtrl', function SearchModalController($scope, $modalInstance){

	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

});