angular.module( 'symantis.creator', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'creator', {
		url: '/creator',
		views: {
			"main": {
				controller: 'CreatorCtrl',
				templateUrl: 'creator/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
	            templateUrl: 'header/header.tpl.html'
			}
		}
	});
})

.controller( 'CreatorCtrl', function CreatorController( $scope, titleService ) {
	titleService.setTitle('Creator App');

	
});