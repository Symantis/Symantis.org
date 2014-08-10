angular.module( 'symantis.search', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'search', {
		url: '/search',
		views: {
			"main": {
				controller: 'SearchCtrl',
				templateUrl: 'search/index.tpl.html'
			}
		}
	});
})

.controller( 'SearchCtrl', function SearchController( $scope, titleService ) {
	titleService.setTitle('Search');

	
});