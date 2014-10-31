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
.controller( 'NewsCtrl', function NewsController($rootScope, $scope, titleService, NewsModel ) {
	titleService.setTitle('News');
	$scope.$parent.toDo = ['duScroll on Left', 'Create New Post model'];
	$scope.loadingSection = true;
	
	NewsModel.getAll().then(function(models){
		console.log(models);
		$rootScope.wordpress = models;
		$scope.loadingSection = false;
	});
	
})
.controller( 'NewsViewCtrl', function NewsViewController( $rootScope, $scope, titleService, $state, $stateParams, NewsModel ) {
	
	for(var i in $rootScope.wordpress){
		if ($rootScope.wordpress[i].id == $stateParams.id){
			$scope.article = $rootScope.wordpress[i];
			break;
		};
	}
	
	NewsModel.getOne($stateParams.id).then(function(model){
		console.log(model);
		$scope.article = model;
		titleService.setTitle('News: ' + $scope.article.title);
	});

	
	$scope.$parent.toDo = [];
	
})
.controller( 'CommunityNewsLeftsideCtrl', function CommunityNewsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});