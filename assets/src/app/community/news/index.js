angular.module( 'symantis.community.news', [
])
/*
.config(function config( $stateProvider ) {
	$stateProvider.state( 'news', {
		url: '/news',
		views: {
			"main": {
				controller: 'NewsCtrl',
				templateUrl: 'community/news/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})
*/
.controller( 'NewsCtrl', function NewsController($rootScope, $scope, titleService, cache, news ) {
	titleService.setTitle('News');
	$scope.$parent.toDo = ['duScroll on Left', 'Create New Post model'];
	$scope.loadingSection = true;
	
	cache.resolveNewsCache(news).then(function(news){
		$rootScope.news = news;
		$scope.loadingSection = false;
	});
	
})
.controller( 'NewsViewCtrl', function NewsViewController( $rootScope, $scope, titleService, $state, $stateParams, cache, news, article ) {
	
	/*
	for(var i in $rootScope.news){
		if ($rootScope.news[i].id == $stateParams.id){
			$scope.article = $rootScope.news[i];
			break;
		};
	}
	*/

	$scope.loadingSection = true;

	cache.resolveArticleCache($rootScope.news, article.id).then(function(article){
		//console.log(article);
		$scope.article = article;
		
		titleService.setTitle('News: ' + $scope.article.title);
		$scope.loadingSection = false;
		
	});

	
	$scope.$parent.toDo = [];
	
})
.controller( 'CommunityNewsLeftsideCtrl', function CommunityNewsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});