angular.module( 'symantis.more', [
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'more', {
			url: '/more',
			views: {
				"main": {
					controller: 'MoreCtrl',
					templateUrl: 'more/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				},
				"header": {
					controller: 'HeaderCtrl',
	                templateUrl: 'header/header.tpl.html'
				},
				"subheader@more": {
					controller: 'MoreHeaderCtrl',
	                templateUrl: 'more/header.tpl.html'
				}
				/*
				"header": {
					controller: 'AboutHeaderCtrl',
	                templateUrl: 'about/header.tpl.html'
				}
				*/
			}
		})
		.state( 'more.contact', {
			url: '/contact',
			views: {
				"main@": {
					controller: 'ContactCtrl',
					templateUrl: 'more/contact/index.tpl.html'
				}
			}
		})
		.state( 'more.extras', {
			url: '/extras',
			views: {
				"main@": {
					controller: 'ExtrasCtrl',
					templateUrl: 'more/extras/index.tpl.html'
				}
			}
		})
		.state( 'more.contributors', {
			url: '/contributors',
			views: {
				"main@": {
					controller: 'ContributorsCtrl',
					templateUrl: 'more/contributors/index.tpl.html'
				}
			}
		})
	;
})

.controller( 'MoreCtrl', function MoreController( $scope, titleService ) {
	titleService.setTitle('More');
})
.controller( 'MoreHeaderCtrl', function MoreHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
});