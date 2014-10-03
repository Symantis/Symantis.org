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
			},
			"header": {
				controller: 'HeaderCtrl',
	            templateUrl: 'header/header.tpl.html'
			},
			"footer": {
				controller: 'FooterCtrl',
                templateUrl: 'footer/index.tpl.html'
			},
			"subheader@start": {
				controller: 'StartHeaderCtrl',
                templateUrl: 'start/header.tpl.html'
			},
			"leftside@start": {
				controller: 'StartLeftsideCtrl',
                templateUrl: 'start/leftside.tpl.html'
			}
		}
	});
})

.controller( 'StartCtrl', function StartController( $scope, titleService ) {
	titleService.setTitle('Getting Started');

	
})
.controller( 'StartHeaderCtrl', function StartHeaderController( $scope, titleService ) {
	//titleService.setTitle('Getting Started');

	
})
.controller( 'StartLeftsideCtrl', function StartLeftsideController( $scope ) {
	//titleService.setTitle('Getting Started');
	
});