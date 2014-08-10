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

.controller( 'KitchenCtrl', function KitchenController( $scope, titleService ) {
	titleService.setTitle('Kitchen');

	
});