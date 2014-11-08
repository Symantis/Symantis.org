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
.controller( 'QueriesCtrl', function QueriesController( $http, $scope, $rootScope, $state, titleService, queries, QueryDS ) {
	titleService.setTitle('Queries');
	
	//console.log($scope.$parent.$parent);

	$scope.$parent.toDo = [];

	$scope.loadingSection = true;

	//$scope.queries = queries;
	/*
	cache.resolveQueriesCache(queries).then(function(queries){
		$rootScope.queries = queries;
		$scope.loadingSection = false;
	});
	*/

	QueryDS.findAll().then(function(){
		$scope.loadingSection = false;
		QueryDS.bindAll($rootScope, 'queries');
	})
	

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
	      	/*
	      	if(!cache.checkQuickQueryCache($rootScope.queries, item.id)){
	      		return cache.cacheCreatedQuery($rootScope.queries, item);
	      	}
	      	*/
	        //queries.push({id: item.id, title: item.title});
	        //$scope.queries.push(item);
	      });

	      //return queries;
	    });
	  };

	
})
.controller( 'QueriesViewCtrl', function QueriesViewController($scope, $rootScope, titleService, $state, query, queries, utils, QueryDS, QueryResponseDS, QueryCommentDS) {
	
	//$scope.query = query;
	//$scope.loadingSection = true;
	/*
	cache.resolveQueryCache($rootScope.queries, query.id).then(function(query){
		$scope.query = query;
		
		titleService.setTitle('Query: ' + $scope.query.title);
		$scope.loadingSection = false;
		
	});
	*/

	console.log(query.id);

	QueryDS.find(query.id).then(function (model) {
	  
		QueryDS.loadRelations(query, ['queryresponses']).then(function (query) {
	    	//query.responses; // array
	    	
		    angular.forEach(query.responses, function(response, key) {
				console.log(response);	
				//QueryResponseDS.findAll({where: {response: response.id }});
				//QueryReplyDS.inject(response.replies);
				
				QueryResponseDS.loadRelations(response, ['responsecomments']).then(function (response) {
					console.log(response.replies);
				});
				
				
		  	});
			
	  	});

	  	QueryDS.update(query.id, {
			totalViews : model.totalViews + 1
		}).then(function(){

		});
	});
	QueryDS.bindOne($scope, 'query', query.id);
	

	//QueryModel.updateViews({id: query.id });

	$scope.comments = {};
	$scope.comments.selected = true;
	$scope.newResponse = {
		preview: false,
		response: null
	}

	
	

	$scope.submitResponse = function(form){
		if(form.$valid){
			var newModel = {
				query: query.id,
				response: $scope.newResponse.response,
				author: $scope.currentUser
			}
			
			QueryResponseDS.create(newModel).then(function(response){
				$scope.comments.selected = true;
				$scope.newResponse = null;
				utils.sectionAlert($scope.alerts, { type: 'success', msg: 'Your response was added successfully.' } );
			});

		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
	}

	$scope.submitReply = function(id, reply){
		if(reply){
			console.log("Sumbit Called");
			
			var newModel = {
				author: $scope.currentUser,
				controller: 'query',
				query: query.id,
				response: id,
				comment: reply
			}
			
			QueryCommentDS.create(newModel).then(function(){
				$scope.queries.responses[id].newReply = "";
			});
			/*
			QueryModel.addReply(newModel).then(function(model){
				//$scope.comments.selected = false;
				//utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your reply was added successfully.' } );
			});
			*/
		}else{
			console.log("Sumbit Failed");
		}
	}
	$scope.sumbitSolution = function(id){
		
		QueryDS.update(query.id, {
			solved: id
		}).then(function (query) {
			console.log(query);
			//user; // A reference to the document that's been persisted via an adapter
		});
	}
	$scope.upVote = function(response){
		
		if($scope.currentUser){
			QueryResponseDS.update(response.id, {
				votes: response.votes + 1
			}).then(function (query) {
				console.log(query);
				//user; // A reference to the document that's been persisted via an adapter
			});
		}else{
			console.log("Login");
			$scope.loginModal();
		}
	}
	$scope.downVote = function(response){
		
		if($scope.currentUser){
			QueryResponseDS.update(response.id, {
				votes: response.votes - 1
			}).then(function (query) {
				console.log(query);
				//user; // A reference to the document that's been persisted via an adapter
			});
		}else{
			console.log("Login");
			$scope.loginModal();
		}
	}

})
.controller( 'QueriesEditCtrl', function QueriesEditController( $http, $scope, $rootScope, query, titleService, utils, $timeout, QueryDS ) {
	titleService.setTitle('Edit Query');
	$scope.$parent.toDo = [];

	//$scope.query = query;
	$scope.loadingSection = true;
	QueryDS.find(query.id).then(function(query){
		$scope.loadingSection = false;
	});
	QueryDS.bindOne($scope, 'query', query.id);

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
			
			QueryDS.update(query.id, model).then(function (query) {
				console.log(query);
				$scope.saveStatus = "SAVED!";
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your Query was updated successfully.' } );
				$timeout(function(){
					$scope.saveStatus = "Save";
				}, 2000);
				//user; // A reference to the document that's been persisted via an adapter
			});
		}else{
			utils.sectionAlert($scope.alerts, { type: 'alert', msg: 'Opps, some things are missing... Try again' } );
		}
	}
})
.controller( 'QueriesNewCtrl', function QueriesNewController( $http, $state, $scope, titleService, utils, QueryDS ) {

	titleService.setTitle('New Query');
	$scope.$parent.toDo = [];

	$scope.loadTags = function(query) {
		return $http.get('/api/tags/' + query);
	};

	$scope.newQuery = {
		preview: false,
		title: null,
		query: null,
		category: null,
		tags: []
	}

	$scope.submitQuery = function(form){
		if(form.$valid){
			var model = {
				title: $scope.newQuery.title,
				query: $scope.newQuery.query,
				tags: angular.toJson($scope.newQuery.tags),
				category: $scope.newQuery.category,
				author: $scope.currentUser
			}
			console.log(model);

			QueryDS.create(model).then(function (query) {
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your Query was added successfully.' } );	
				$state.go('community.queries.view',{id: query.id, title: query.clean });
			});

			/*
			QueryModel.create(model).then(function (newModel){
				utils.sectionAlert($scope.alerts, { type: 'success',msg: 'Your Query was added successfully.' } );	
				$state.go('community.queries.view',{id: newModel.id, title: newModel.clean });
			});
			*/
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