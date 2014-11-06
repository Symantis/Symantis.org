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
.controller( 'NewsCtrl', function NewsController($rootScope, $scope, titleService, news, NewsDS ) {
	titleService.setTitle('News');
	$scope.$parent.toDo = ['duScroll on Left', 'Create New Post model'];
	$scope.loadingSection = true;

	NewsDS.findAll().then(function(){
		$scope.loadingSection = false;
		NewsDS.bindAll($scope, 'news');	
	})
	
	/*
	cache.resolveNewsCache(news).then(function(news){
		titleService.setTitle('News');
		$rootScope.news = news;
		$scope.loadingSection = false;
	});
	*/
	
})
.controller( 'NewsViewCtrl', function NewsViewController( $rootScope, $scope, titleService, $state, $stateParams, article, NewsDS ) {
	
	$scope.$parent.toDo = [];
	
	$scope.loadingSection = true;

	NewsDS.find(article.id).then(function(model){
		titleService.setTitle('News: ' + model.title);	
		$scope.loadingSection = false;
	});
	NewsDS.bindOne($scope, 'article', article.id);

	/*
	$scope.loadingSection = true;

	cache.resolveArticleCache($rootScope.news, article.id).then(function(article){
		//console.log(article);
		$scope.article = article;
		
		titleService.setTitle('News: ' + $scope.article.title);
		$scope.loadingSection = false;
		
	});
	*/

	
	
	
})
.controller( 'CommunityNewsLeftsideCtrl', function CommunityNewsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});