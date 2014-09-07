angular.module( 'symantis.docs', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'docs', {
		url: '/docs',
		views: {
			"main": {
				controller: 'DocsCtrl',
				templateUrl: 'docs/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
				templateUrl: 'header/header.tpl.html'
			},
			"subheader@docs": {
				controller: 'DocsHeaderCtrl',
                templateUrl: 'docs/header.tpl.html'
			},
			"leftside@docs": {
				controller: 'DocsLeftsideCtrl',
                templateUrl: 'docs/leftside.tpl.html'
			}
		}
	});
})

.controller( 'DocsCtrl', function DocsController( $scope, titleService ) {
	titleService.setTitle('Docs');

	
})
.controller( 'DocsHeaderCtrl', function DocsHeaderController( $scope, titleService ) {
	//titleService.setTitle('Docs');

	
})
.controller( 'DocsLeftsideCtrl', function DocsLeftsideController( $scope ) {
	//titleService.setTitle('Docs');

	
});