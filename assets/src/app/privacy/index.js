angular.module( 'symantis.privacy', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'privacy', {
		url: '/privacy',
		views: {
			"main": {
				controller: 'PrivacyCtrl',
				templateUrl: 'privacy/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
				templateUrl: 'header/header.tpl.html'
			},
			"subheader@privacy": {
				controller: 'PrivacyHeaderCtrl',
                templateUrl: 'privacy/header.tpl.html'
			},
			"leftside@privacy": {
				controller: 'PrivacyLeftsideCtrl',
                templateUrl: 'privacy/leftside.tpl.html'
			}
		}
	});
})

.controller( 'PrivacyCtrl', function PrivacyController( $scope, titleService ) {
	titleService.setTitle('Privacy');

	
})
.controller( 'PrivacyHeaderCtrl', function PrivacyHeaderController( $scope, titleService ) {
	//titleService.setTitle('Docs');

	
})
.controller( 'DocsLeftsideCtrl', function DocsLeftsideController( $scope ) {
	//titleService.setTitle('Docs');

	
});