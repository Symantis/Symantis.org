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
.controller( 'QueriesCtrl', function QueriesController( $http, $sails, $scope, $rootScope, $state, titleService, cache, queries ) {
	titleService.setTitle('Queries');
	
	//console.log($scope.$parent.$parent);

	$scope.$parent.toDo = [];

	$scope.loadingSection = true;

	//$scope.queries = queries;
	cache.resolveQueriesCache(queries).then(function(queries){
		$rootScope.queries = queries;
		$scope.loadingSection = false;
	});
	

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
	      	if(!cache.checkQuickQueryCache($rootScope.queries, item.id)){
	      		return cache.cacheCreatedQuery($rootScope.queries, item);
	      	}
	        //queries.push({id: item.id, title: item.title});
	        //$scope.queries.push(item);
	      });

	      //return queries;
	    });
	  };

	
})
.controller( 'QueriesViewCtrl', function QueriesViewController($scope, $rootScope, titleService, $state, query,queries, cache, QueryModel, utils, $sails ) {
	
	//$scope.query = query;
	$scope.loadingSection = true;

	cache.resolveQueryCache($rootScope.queries, query.id).then(function(query){
		$scope.query = query;
		
		titleService.setTitle('Query: ' + $scope.query.title);
		$scope.loadingSection = false;
		
	});

	QueryModel.updateViews({id: query.id });

	$scope.comments = {};
	$scope.comments.selected = true;
	$scope.newResponse = {
		preview: false,
		response: null
	}

	

	$scope.submitResponse = function(form){
		if(form.$valid){
			var newModel = {
				query: $scope.query.id,
				response: $scope.newResponse.response,
				author: $scope.currentUser.id
			}

			QueryModel.addResponse(newModel).then(function(model){
				$scope.comments.selected = false;
				$scope.newResponse = null;
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your response was added successfully.' } );
			});
		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
	}

	$scope.submitReply = function(id, reply){
		if(reply){
			//console.log("Sumbit Called");
			
			var newModel = {
				author: $scope.currentUser.id,
				query: $scope.query.id,
				response: id,
				comment: reply
			}
			QueryModel.addReply(newModel).then(function(model){
				$scope.comments.selected = false;
				//utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your reply was added successfully.' } );
			});
		}else{

		}
	}
	$scope.sumbitSolution = function(id){
		var newModel = {
			user: $scope.currentUser.id,
			query: $scope.query.id,
			response: id
		}
		QueryModel.addSolution(newModel).then(function(model){
			//$scope.comments.selected = false;
			//utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your reply was added successfully.' } );
		});
	}
	$scope.upVote = function(id){
		
		if($scope.currentUser){
			var newModel = {
				user: $scope.currentUser.id,
				query: $scope.query.id,
				response: id,
				vote: 'up'
			}
			QueryModel.addVote(newModel).then(function(model){
				//$scope.comments.selected = false;
				//utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your reply was added successfully.' } );
			});
		}else{
			console.log("Login");
			$scope.loginModal();
		}
	}
	$scope.downVote = function(id){
		
		if($scope.currentUser){
			var newModel = {
				user: $scope.currentUser.id,
				query: $scope.query.id,
				response: id,
				vote: 'down'
			}
			QueryModel.addVote(newModel).then(function(model){
				//$scope.comments.selected = false;
				//utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your reply was added successfully.' } );
			});
		}else{
			console.log("Login");
			$scope.loginModal();
		}
	}

})
.controller( 'QueriesEditCtrl', function QueriesEditController( $http, $scope, $rootScope, query, titleService, cache, QueryModel, utils, $timeout ) {
	titleService.setTitle('Edit Query');
	$scope.$parent.toDo = [];

	//$scope.query = query;

	$scope.loadingSection = true;
	cache.resolveQueryCache($rootScope.queries, query.id).then(function(query){
		$rootScope.query = query;	
		$scope.loadingSection = false;
		//console.log(query);
	});

	$scope.preview = false;
	$scope.saveStatus = "Save";



	$scope.loadTags = function(query) {
		return $http.get('/api/tags/' + query);
	};

	$scope.updateQuery = function(form){
		if(form.$valid){
			
			$scope.saveStatus = "Saving...";

			var model = {
				id: $scope.query.id,
				title: $scope.query.title,
				query: $scope.query.query,
				tags: $scope.query.tags,
			}
			
			console.log(model);
			QueryModel.update(model).then(function (newModel){
				$scope.saveStatus = "SAVED!";
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your Query was updated successfully.' } );
				$timeout(function(){
					$scope.saveStatus = "Save";
				}, 2000);
			});
		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
	}
})
.controller( 'QueriesNewCtrl', function QueriesNewController( $http, $state, $scope, titleService, QueryModel, utils ) {

	titleService.setTitle('New Query');
	$scope.$parent.toDo = [];

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
				$state.go('community.queries.view',{id: newModel.id, title: newModel.clean });
			});

		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
	}

	
})
.controller( 'QueriesMineCtrl', function QueriesMineController($scope, titleService) {
	titleService.setTitle('My Queries');
	$scope.$parent.toDo = ['Add Queries'];

})
.controller( 'CommunityQueriesLeftsideCtrl', function CommunityQueriesLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'CommunityQueriesNavCtrl', function CommunityQueriesNavController( $scope ) {
	//titleService.setTitle('About');
});