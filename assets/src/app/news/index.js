angular.module( 'symantis.news', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'news', {
		url: '/news',
		views: {
			"main": {
				controller: 'NewsCtrl',
				templateUrl: 'news/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})

.controller( 'NewsCtrl', function NewsController( $scope, titleService ) {
	titleService.setTitle('news');

	
});