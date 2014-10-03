angular.module( 'symantis.roadmap', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'roadmap', {
		url: '/roadmap',
		views: {
			"main": {
				controller: 'RoadmapCtrl',
				templateUrl: 'roadmap/index.tpl.html'
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
			"subheader@roadmap": {
				controller: 'RoadmapHeaderCtrl',
                templateUrl: 'roadmap/header.tpl.html'
			},
			"leftside@roadmap": {
				controller: 'RoadmapLeftsideCtrl',
                templateUrl: 'roadmap/leftside.tpl.html'
			}
		}
	});
})

.controller( 'RoadmapCtrl', function RoadmapController( $scope, titleService ) {
	titleService.setTitle('Security');

	
})
.controller( 'RoadmapHeaderCtrl', function RoadmapHeaderController( $scope, titleService ) {
	//titleService.setTitle('Docs');

	
})
.controller( 'RoadmapLeftsideCtrl', function RoadmapLeftsideController( $scope ) {
	//titleService.setTitle('Docs');

	
});