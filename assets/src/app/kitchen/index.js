angular.module( 'symantis.kitchen', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'kitchen', {
		url: '/kitchen',
		views: {
			"main": {
				controller: 'KitchenCtrl',
				templateUrl: 'kitchen/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})

.controller( 'KitchenCtrl', function KitchenController( $scope, titleService, $modal ) {
	titleService.setTitle('Kitchen');

	$scope.kitchenModal = function () {

		var modalInstance = $modal.open({
			templateUrl: 'kitchen/modals/kitchenModal.tpl.html',
			controller: 'KitchenModalCtrl',
			windowClass: 'small'
		});
	};
	$scope.FullScreenModal = function () {

		var modalInstance = $modal.open({
			templateUrl: 'kitchen/modals/FullScreenModal.tpl.html',
			controller: 'KitchenModalCtrl',
			windowClass: 'full-screen'
		});
	};
	
})
.controller( 'KitchenModalCtrl', function KitchenModalController($scope, $modalInstance){

	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

});
