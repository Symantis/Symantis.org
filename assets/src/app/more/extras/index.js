angular.module( 'symantis.extras', [
])

.config(function config( $stateProvider ) {
	/*
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
				controller: 'HeaderCtrl',
                templateUrl: 'header/header.tpl.html'
			},
			"subheader@about": {
				controller: 'AboutHeaderCtrl',
                templateUrl: 'about/header.tpl.html'
			}
		}
	});
	*/
})

.controller( 'ExtrasCtrl', function ExtrasController( $scope, titleService ) {
	titleService.setTitle('Extras');
})
.controller( 'ExtrasHeaderCtrl', function ExtrasHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'ExtrasLeftsideCtrl', function ExtrasLeftsideController( $scope ) {
	//titleService.setTitle('About');
});