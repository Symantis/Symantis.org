angular.module( 'symantis.more', [
	'symantis.more.extras',
	'symantis.more.contributors',
	'symantis.more.sykit'
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
				},
				"leftside@more": {
					controller: 'MoreLeftsideCtrl',
	                templateUrl: 'more/leftside.tpl.html'
				}
				/*
				"header": {
					controller: 'AboutHeaderCtrl',
	                templateUrl: 'about/header.tpl.html'
				}
				*/
			}
		})
		.state( 'more.sykit', {
			url: '/sykit',
			views: {
				"main@": {
					controller: 'SykitCtrl',
					templateUrl: 'more/sykit/index.tpl.html'
				},
				"leftside@more.sykit": {
					controller: 'SykitLeftsideCtrl',
                	templateUrl: 'more/sykit/leftside.tpl.html'
				}
			}
		})
		.state( 'more.extras', {
			url: '/extras',
			views: {
				"main@": {
					controller: 'ExtrasCtrl',
					templateUrl: 'more/extras/index.tpl.html'
				},
				"leftside@more.extras": {
					controller: 'ExtrasLeftsideCtrl',
                	templateUrl: 'more/extras/leftside.tpl.html'
				}
			}
		})
		.state( 'more.contributors', {
			url: '/contributors',
			views: {
				"main@": {
					controller: 'ContributorsCtrl',
					templateUrl: 'more/contributors/index.tpl.html'
				},
				"leftside@more.contributors": {
					controller: 'ContributorsLeftsideCtrl',
                	templateUrl: 'more/contributors/leftside.tpl.html'
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
})
.controller( 'MoreLeftsideCtrl', function MoreLeftsideController( $scope ) {
	//titleService.setTitle('About');
});