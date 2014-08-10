angular.module( 'symantis.start', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'start', {
		url: '/start',
		views: {
			"main": {
				controller: 'StartCtrl',
				templateUrl: 'start/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})

.controller( 'StartCtrl', function StartController( $scope, titleService ) {
	titleService.setTitle('Getting Started');

	
});