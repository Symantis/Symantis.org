angular.module( 'symantis.news', [
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
.controller( 'NewsCtrl', function NewsController( $scope, titleService ) {
	titleService.setTitle('news');

	
})
.controller( 'NewsViewCtrl', function NewsViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.articles){
		if ($scope.articles[i].id == $stateParams.id){
			$scope.article = $scope.articles[i];
			break;
		};
	}

	titleService.setTitle('News: ' + $scope.article.title);

	
})
.controller( 'CommunityNewsLeftsideCtrl', function CommunityNewsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});