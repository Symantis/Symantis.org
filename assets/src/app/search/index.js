angular.module( 'symantis.search', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'search', {
		url: '/search',
		views: {
			"main": {
				controller: 'SearchCtrl',
				templateUrl: 'search/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"leftside@search": {
				controller: 'SearchLeftsideCtrl',
                templateUrl: 'search/leftside.tpl.html'
			}
		}
	});
})

.controller( 'SearchCtrl', function SearchController( $scope, titleService ) {
	titleService.setTitle('Search');

	
})

.controller( 'SearchLeftsideCtrl', function SearchLeftsideController( $scope ) {

	
});