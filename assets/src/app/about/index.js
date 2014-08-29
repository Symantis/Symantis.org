angular.module( 'symantis.about', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'about', {
		url: '/about',
		views: {
			"main": {
				controller: 'AboutCtrl',
				templateUrl: 'about/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'AboutHeaderCtrl',
                templateUrl: 'about/header.tpl.html'
			}
		}
	});
})

.controller( 'AboutCtrl', function AboutController( $scope, titleService ) {
	titleService.setTitle('About');
})
.controller( 'AboutHeaderCtrl', function AboutHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
});