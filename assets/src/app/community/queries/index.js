angular.module( 'symantis.community.queries', [
])
/*
.config(function config( $stateProvider ) {
	$stateProvider.state( 'queries', {
		url: '/queries',
		views: {
			"main": {
				controller: 'QueriesCtrl',
				templateUrl: 'queries/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})
*/
.controller( 'QueriesCtrl', function QueriesController( $http, $scope, $state, titleService, queries, cache ) {
	titleService.setTitle('Queries');

	$scope.queries = queries;

	 $scope.searchQueries = function(query) {
	 	console.log(query);
	 	$state.go('community.queries');
	    return $http.get('/api/query/like/' + query).then(function(res){
	      //var queries = [];
	      console.log(res.data);
	      angular.forEach(res.data, function(item){
	      	if(!cache.checkQueryCache($scope.queries, item.id)){
	      		return cache.cacheNewQuery($scope.queries, item);
	      	}
	        //queries.push({id: item.id, title: item.title});
	        //$scope.queries.push(item);
	      });

	      //return queries;
	    });
	  };


	
})
.controller( 'QueriesViewCtrl', function QueriesViewController($http, $scope, titleService, $state, $stateParams, query, cache ) {
	
	$scope.query = query;


	var inCache = cache.checkQueryCache($scope.cachedQueries, query.id);
	if(inCache){
		$scope.query = cache.getCachedQuery($scope.cachedQueries, query.id);
	}else{
		$http.get('/api/query/' + query.id).then(function(res){
			$scope.query = res.data;
			cache.cacheNewQuery($scope.cachedQueries, $scope.query);
		});
	}
	/*
	for(var i in $scope.queries){
		if ($scope.queries[i].id == $stateParams.id){
			$scope.query = $scope.queries[i];
			break;
		};
	}
	*/

	titleService.setTitle('Query: ' + $scope.query.title);

	$scope.comments = {};
	$scope.comments.selected = true;
	if(!query.responses || query.responses.length == 0){
		$scope.comments.selected = false;
	}
	
})
.controller( 'QueriesNewCtrl', function QueriesNewController( $http, $scope, titleService, QueryModel, utils ) {

	titleService.setTitle('New Query');
	$scope.loadTags = function(query) {
		return $http.get('/api/tags/' + query);
	};


	$scope.newQuery = {
		preview: false,
		title: null,
		query: null,
		tags: []
	}

	$scope.submitQuery = function(form){
		if(form.$valid){
			var model = {
				title: $scope.newQuery.title,
				query: $scope.newQuery.query,
				tags: angular.toJson($scope.newQuery.tags),
				author: $scope.currentUser
			}
			console.log(model);

			QueryModel.create(model).then(function (newModel){
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your Query was added successfully.' } );	
			});

		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
	}

	
})
.controller( 'QueriesMineCtrl', function QueriesMineController($scope, titleService) {
	titleService.setTitle('My Queries');

})
.controller( 'CommunityQueriesLeftsideCtrl', function CommunityQueriesLeftsideController( $scope ) {
	//titleService.setTitle('About');
});