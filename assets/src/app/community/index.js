angular.module( 'symantis.community', [
	'symantis.community.connections',
	'symantis.community.news',
	'symantis.community.queries',
	'symantis.community.tags'
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
				},
				"header": {
					controller: 'HeaderCtrl',
	                templateUrl: 'header/header.tpl.html'
				},

				"subheader@community": {
					controller: 'CommunityHeaderCtrl',
                	templateUrl: 'community/header.tpl.html'
				},
				"leftside@community": {
					controller: 'CommunityLeftsideCtrl',
                	templateUrl: 'community/leftside.tpl.html'
				}
			}
		})
		.state( 'community.news', {
			url: '/news',
			views: {
				"main@": {
					controller: 'NewsCtrl',
					templateUrl: 'community/news/index.tpl.html'
				},
				"leftside@community.news": {
					controller: 'CommunityNewsLeftsideCtrl',
                	templateUrl: 'community/news/leftside.tpl.html'
				}
			}
		})
		.state( 'community.news.view', {
			url: '/:id/:title',
			views: {
				"news@community.news": {
					controller: 'NewsViewCtrl',
					templateUrl: 'community/news/view.tpl.html'
				}
			}
		})
		.state( 'community.queries', {
			url: '/queries',
			views: {
				"main@": {
					controller: 'QueriesCtrl',
					templateUrl: 'community/queries/index.tpl.html'
				},
				"leftside@community.queries": {
					controller: 'CommunityQueriesLeftsideCtrl',
                	templateUrl: 'community/queries/leftside.tpl.html'
				}
			}
		})
		.state( 'community.queries.view', {
			url: '/:id/:title',
			views: {
				"queries@community.queries": {
					controller: 'QueriesViewCtrl',
					templateUrl: 'community/queries/view.tpl.html'
				}
			}
		})
		.state( 'community.connections', {
			url: '/connections',
			views: {
				"main@": {
					controller: 'ConnectionsCtrl',
					templateUrl: 'community/connections/index.tpl.html'
				},
				"leftside@community.connections": {
					controller: 'CommunityConnectionsLeftsideCtrl',
                	templateUrl: 'community/connections/leftside.tpl.html'
				}
			}
		})
		.state( 'community.tags', {
			url: '/tags',
			views: {
				"main@": {
					controller: 'TagsCtrl',
					templateUrl: 'community/tags/index.tpl.html'
				}
			}
		})
		.state( 'community.tags.view', {
			url: '/:tag',
			views: {
				"main@": {
					controller: 'TagsViewCtrl',
					templateUrl: 'community/tags/view.tpl.html'
				}
			}
		})
	;
})

.controller( 'CommunityCtrl', function CommunityController( $scope, $state ,titleService ) {
	titleService.setTitle('Community');


	
})
.controller( 'CommunityHeaderCtrl', function CommunityHeaderController( $scope, $state, titleService ) {
	$scope.$state = $state;
	console.log($scope.$state);
	//titleService.setTitle('About');
})
.controller( 'CommunityLeftsideCtrl', function CommunityLeftsideController( $scope ) {
	//titleService.setTitle('About');
});