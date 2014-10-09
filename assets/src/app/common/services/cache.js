angular.module( 'services.cache', ['lodash'])

.factory('cache', function($q, $rootScope, lodash, config, $timeout, UserModel, QueryModel) {

	return {
		
		resolveUserCache: function(users, handle){
			if(this.checkUserCache(users, handle)){
				return this.getCachedUser(users, handle);
			}else{
				 var self = this;
				 console.log("Getting " +handle);			 
				 return UserModel.getOneHandle(handle).then(function(user){
				 	console.log(user);
				 	return self.cacheNewUser(users, user);
				 });
			}
		},
		checkUserCache: function(users, identifier){
			return _.some(users, {handle: identifier});
		},
		cacheUpdatedUser: function(users, handle, data){
			var user = _.find(users, {handle: handle});
					   _.merge(user, data);
			return users;
		},
		cacheNewUser: function(users, user){
			 users.push(user);
			 return user;
		},
		getCachedUser: function(users, handle){
			return _.find(users, {handle: handle});
		},

		resolveQueryCache: function(queries, id){
			var self = this;
			if(this.checkQueryCache(queries, id)){
				console.log("returning cached query...");
				var deferred = $q.defer();
				var query = this.getCachedQuery(queries, id);
				deferred.resolve(query);
				return deferred.promise;

				//return 
			}else{
				 console.log("getting query...");
				 return QueryModel.getOne(id).then(function(query){
				 	
				 	return self.cacheNewQuery(queries, query);
				 });
			}
		},
		resolveQueriesCache: function(queries){
			var self = this;
			if(queries.length == 0){
				console.log("getting queries...");
				
				return queries = QueryModel.getAll().then(function(models){
					console.log(models);	
					return models;
				});
			}else{
				console.log("returning cached queries...");
				var deferred = $q.defer();
				deferred.resolve(queries);
				return deferred.promise;
			}
		},
		cacheQueries: function(queries){
			if(queries.length == 0){
				return QueryModel.getAll().then(function(models){
					queries = models;
					console.log(models);	
					return models;
				});
			}else{
			    console.log("returning cached queries...");
				var deferred = $q.defer();
				deferred.resolve(queries);
				return deferred.promise;
			}
		},
		checkQueryCache: function(queries, id){
			return _.some(queries, {id: id});
		},
		cacheUpdatedQuery: function(queries, id, data){
			var query = _.find(queries, {id: id});
						_.merge(query, data);
			return queries;
		},
		cacheNewQuery: function(queries, query){
			
			 queries.push(query);
			 return query;
		},
		getCachedQuery: function(queries, id){
			return _.find(queries, {id: id});
		},
		removeQueryFromCache: function(queries, id){
			return _.remove(queries, {id: id});
		},
		resolveQueryResponsesCache: function(query){
			//var query = _.find(queries, {id: id});
			//if(query.responses.length == 0){
			var self = this;
			var deferred = $q.defer();
			responses = _.map(query.responses, function(response){
				return self.cacheQueryReponse(response);
			});

			deferred.resolve(responses);
			return deferred.promise;
		},
		cacheQueryReponse: function(response){
			
			if(response.cached){
				console.log("returning cached response...");
				var deferred = $q.defer();
				deferred.resolve(response);
				return deferred.promise;
			}else{
				console.log("getting response...");
				return response = QueryModel.getResponse(response.id).then(function(model){
					model.cached = true;
					//$rootScope.$digest();
					return model;
				});
			}
		},
		cacheQueryAllResponses: function(queries, id, responses){
			var query = _.find(queries, {id: id});
						_.merge(query.responses, responses);
			return responses;
		}

	};

});