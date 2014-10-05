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
.controller( 'QueriesCtrl', function QueriesController( $http, $sails, $scope, $state, titleService, cache, queries ) {
	titleService.setTitle('Queries');

	$scope.queries = queries;
	/*
	$scope.queries = cache.cacheQueries($scope.queries).then(function(r) {
			return r;
	});
	*/
	//$scope.queries = cache.cacheQueries($scope.queries);
	//$scope.queries = cache.resolveQueriesCache($scope.queries);

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

	$sails.on('query', function (envelope) {
		switch(envelope.verb) {
			
			case 'created':
				cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'addedTo':
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'updated':
				cache.cacheUpdatedQuery($scope.queries, envelope.id, envelope.data);
				//lodash.
				//$scope.queries.unshift(envelope.data);
				break;
			case 'destroyed':
				cache.removeQueryFromCache($scope.queries, envelope.id);
				
				break;
		}
	});

	
})
.controller( 'QueriesViewCtrl', function QueriesViewController($scope, titleService, $state, query, cache, QueryModel ) {
	
	$scope.query = query;

	$scope.query = cache.resolveQueryCache($scope.queries, query.id);
	
	QueryModel.updateViews({id: query.id });

	titleService.setTitle('Query: ' + $scope.query.title);

	$scope.comments = {};
	$scope.comments.selected = true;
	if(!query.responses || query.responses.length == 0){
		$scope.comments.selected = false;
	}
	
})
.controller( 'QueriesEditCtrl', function QueriesEditController( $http, $scope, query, titleService, cache, QueryModel, utils ) {
	
	$scope.query = query;
	$scope.query = cache.resolveQueryCache($scope.queries, query.id);
	
	$scope.editQuery = {
		preview: false,
		title: $scope.query.title,
		query: $scope.query.query,
		tags: $scope.query.tags || []
	}

	titleService.setTitle('Edit Query');

	$scope.loadTags = function(query) {
		return $http.get('/api/tags/' + query);
	};

	$scope.updateQuery = function(form){
		if(form.$valid){
			var model = {
				id: $scope.query.id,
				title: $scope.editQuery.title,
				query: $scope.editQuery.query,
				tags: angular.toJson($scope.editQuery.tags),
			}

			console.log(model);
			QueryModel.update(model).then(function (newModel){
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your Query was updated successfully.' } );	
			});
		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
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