angular.module( 'symantis.docs', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'docs', {
		url: '/docs',
		views: {
			"main": {
				controller: 'DocsCtrl',
				templateUrl: 'docs/index.tpl.html'
			}
		}
	});
})

.controller( 'DocsCtrl', function DocsController( $scope, titleService ) {
	titleService.setTitle('Docs');

	
});