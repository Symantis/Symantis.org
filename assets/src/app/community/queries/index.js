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
.controller( 'QueriesCtrl', function QueriesController( $http, $scope, titleService, cache ) {
	titleService.setTitle('Queries');


	 $scope.searchQueries = function(query) {
	 	console.log(query);
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
.controller( 'QueriesViewCtrl', function QueriesViewController( $scope, titleService, $state, $stateParams  ) {
	for(var i in $scope.queries){
		if ($scope.queries[i].id == $stateParams.id){
			$scope.query = $scope.queries[i];
			break;
		};
	}

	titleService.setTitle('Query: ' + $scope.query.title);

	
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
.controller( 'CommunityQueriesLeftsideCtrl', function CommunityQueriesLeftsideController( $scope ) {
	//titleService.setTitle('About');
});