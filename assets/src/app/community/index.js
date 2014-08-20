angular.module( 'symantis.community', [
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'community', {
			url: '/community',
			views: {
				"main": {
					controller: 'CommunityCtrl',
					templateUrl: 'community/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				}
			}
		})
		.state( 'community.news', {
			url: '/news',
			views: {
				"main@": {
					controller: 'NewsCtrl',
					templateUrl: 'community/news/index.tpl.html'
				}
			}
		})
		.state( 'community.queries', {
			url: '/queries',
			views: {
				"main@": {
					controller: 'QueriesCtrl',
					templateUrl: 'community/queries/index.tpl.html'
				}
			}
		})
		.state( 'community.connections', {
			url: '/connections',
			views: {
				"main@": {
					controller: 'ConnectionsCtrl',
					templateUrl: 'community/connections/index.tpl.html'
				}
			}
		})
		.state( 'community.tags', {
			url: '/:tag',
			views: {
				"main@": {
					controller: 'TagsCtrl',
					templateUrl: 'community/tags/index.tpl.html'
				}
			}
		})
	;
})

.controller( 'CommunityCtrl', function CommunityController( $scope, titleService ) {
	titleService.setTitle('Community');

	
});