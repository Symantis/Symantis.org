angular.module( 'symantis.creator', [
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'creator', {
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
				},
				"footer": {
					controller: 'FooterCtrl',
	                templateUrl: 'footer/index.tpl.html'
				},
				"subheader@creator": {
					controller: 'CreatorHeaderCtrl',
                	templateUrl: 'creator/header.tpl.html'
				},
				"leftside@creator": {
					controller: 'CreatorLeftsideCtrl',
	               	templateUrl: 'creator/leftside.tpl.html'
				}

			}
		})
		.state( 'creator.app', {
			url: '/app',
			views: {
				"main@": {
					controller: 'CreatorAppCtrl',
					templateUrl: 'creator/app/index.tpl.html'
				},
				"sitenav@": {
					controller: 'CreatorAppNavCtrl',
	                template: '<div></div>'
				},
				"header@": {
					controller: 'CreatorAppHeaderCtrl',
		            template: '<div></div>'
				}
			}
		})
	;
})

.controller( 'CreatorCtrl', function CreatorController( $scope, titleService ) {
	titleService.setTitle('Creator App');

	
})
.controller( 'CreatorHeaderCtrl', function CreatorHeaderController( $scope ) {
	
})
.controller( 'CreatorLeftsideCtrl', function CreatorLeftsideController( $scope ) {
	
});