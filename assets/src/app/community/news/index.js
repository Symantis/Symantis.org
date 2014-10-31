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
.controller( 'NewsCtrl', function NewsController( $scope, titleService, NewsModel ) {
	titleService.setTitle('News');
	$scope.$parent.toDo = ['duScroll on Left', 'Create New Post model'];

	NewsModel.getAll().then(function(models){
		console.log(models);
		$scope.wordpress = models;
	});
	
})
.controller( 'NewsViewCtrl', function NewsViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.articles){
		if ($scope.articles[i].id == $stateParams.id){
			$scope.article = $scope.articles[i];
			break;
		};
	}

	titleService.setTitle('News: ' + $scope.article.title);
	$scope.$parent.toDo = [];
	
})
.controller( 'CommunityNewsLeftsideCtrl', function CommunityNewsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});