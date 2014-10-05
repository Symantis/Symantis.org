angular.module( 'symantis.community', [
	'symantis.community.board',
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
				"footer": {
					controller: 'FooterCtrl',
	                templateUrl: 'footer/index.tpl.html'
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
			resolve: {
				queries : function($rootScope, cache) {
					return cache.cacheQueries($rootScope.queries);
				}
			},
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
			resolve : {
			    query : function($stateParams) {
			        return { id: $stateParams.id, clean: $stateParams.title };
			        //return UserModel.getOneByHandle($stateParams.handle);
			    }
		    },
			views: {
				"queries@community.queries": {
					controller: 'QueriesViewCtrl',
					templateUrl: 'community/queries/view.tpl.html'
				}
			}
		})
		.state( 'community.queries.edit', {
			url: '/:id',
			resolve : {
			    query : function($stateParams) {
			        return { id: $stateParams.id };
			        
			        //return { id: $stateParams.id, clean: $stateParams.title };
			        //return UserModel.getOneByHandle($stateParams.handle);
			    }
		    },
			views: {
				"queries@community.queries": {
					controller: 'QueriesEditCtrl',
					templateUrl: 'community/queries/edit.tpl.html'
				}
			}
		})
		.state( 'community.queries.new', {
			url: '/new',
			views: {
				"queries@community.queries": {
					controller: 'QueriesNewCtrl',
					templateUrl: 'community/queries/new.tpl.html'
				}
			}
		})
		.state( 'community.queries.mine', {
			url: '/mine',
			views: {
				"queries@community.queries": {
					controller: 'QueriesMineCtrl',
					templateUrl: 'community/queries/mine.tpl.html'
				}
			}
		})
		.state( 'community.board', {
			url: '/board',
			resolve: {
				opportunities : function() {
				        return {};
				        //return UserModel.getOneByHandle($stateParams.handle);
				}
			},
			views: {
				"main@": {
					controller: 'BoardCtrl',
					templateUrl: 'community/board/index.tpl.html'
				},
				"leftside@community.board": {
					controller: 'CommunityBoardLeftsideCtrl',
                	templateUrl: 'community/board/leftside.tpl.html'
				}
			}
		})
		.state( 'community.board.view', {
			url: '/:id/:title',
			resolve: {
				opportunity : function($stateParams) {
				        return { id: $stateParams.id, clean: $stateParams.title };
				        //return UserModel.getOneByHandle($stateParams.handle);
				}
			},
			views: {
				"board@community.board": {
					controller: 'BoardViewCtrl',
					templateUrl: 'community/board/view.tpl.html'
				}
			}
		})
		.state( 'community.board.new', {
			url: '/new',
			views: {
				"board@community.board": {
					controller: 'BoardNewCtrl',
					templateUrl: 'community/board/new.tpl.html'
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
	//console.log($scope.$state);
	//titleService.setTitle('About');
})
.controller( 'CommunityLeftsideCtrl', function CommunityLeftsideController( $scope ) {
	//titleService.setTitle('About');
});