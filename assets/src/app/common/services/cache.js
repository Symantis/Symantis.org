angular.module( 'services.cache', ['lodash'])

.factory('cache', function($q, $rootScope, lodash, config, $timeout, UserModel, QueryModel) {

	return {
		
		resolveUserCache: function(users, handle){
			var self = this;
			if(this.checkUserCache(users, handle)){
				console.log("returning cached user...");
				var deferred = $q.defer();
				var user = this.getCachedUser(users, handle);
				deferred.resolve(user);
				return deferred.promise;
			}else{
				 console.log("Getting " +handle);			 
				 return UserModel.getOneHandle(handle).then(function(user){
				 	console.log(user);
				 	return self.cacheNewUser(users, user);
				 });
			}
		},
		resolveUserConnectionsCache: function(users, user){
			var self = this;
			if(user.connections){
				console.log("returning cached user connections...");
				var deferred = $q.defer();
				deferred.resolve(user.connections);
				return deferred.promise;
			}else{
				console.log("Getting user " + user.handle + " connections...");
				return UserModel.getConnections(user.id).then(function(connections){
					user.connections = connections;
					self.cacheUpdatedUser(users, user.handle, {connections: connections});
					return connections;
				});
			}
		},
		checkUserCache: function(users, identifier){
			return _.some(users, {handle: identifier, local:true});
		},
		cacheUpdatedUser: function(users, handle, data){
			var user = _.find(users, {handle: handle});
					   _.merge(user, data);
			return users;
		},
		cacheNewUser: function(users, user){
			 user.local = true;
			 //users.push(user);

			 if(_.some(users, {id: user.id})){
			 	this.cacheUpdatedUser(users, user.handle, user);
			 }else{
				 users.push(user);
			 }

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
			return _.some(queries, {id: id, local: true});
		},
		checkQuickQueryCache: function(queries, id){
			return _.some(queries, {id: id});
		},
		cacheUpdatedQuery: function(queries, id, data){
			var query = _.find(queries, {id: id});
						_.merge(query, data);
			return queries;
		},
		cacheNewQuery: function(queries, collection){
			 console.log(collection);
			 _.map(collection.replies, function(reply){
			 	var response = _.find(collection.responses, {id: reply.response});
				response.replies = response.replies || [];
				response.replies.push(reply);
			 	
			 });
			 var newModel = collection.query;
			 newModel.responses = collection.responses;
			 newModel.local = true;
			 if(_.some(queries, {id: newModel.id})){
			 	this.cacheUpdatedQuery(queries, newModel.id, newModel);
			 }else{
				 queries.push(newModel);
			 }
			 return newModel;
		},
		cacheCreatedQuery: function(queries, query){
			queries.push(query);
			return query;
		},
		getCachedQuery: function(queries, id){
			return _.find(queries, {id: id});
		},
		removeQueryFromCache: function(queries, id){
			return _.remove(queries, {id: id});
		},
		getAndCacheReponse: function(queries, querId, responseId){
			var self = this;
			return QueryModel.getResponse(responseId).then(function(response){
				console.log(response);
				return self.cacheNewQueryReponse(queries, response);
			});

		},
		cacheNewQueryReponse: function(queries, response){
			console.log(response);
			var query = _.find(queries, {id: response.query});
			query.responses = query.responses || [];
			query.responses.push(response);
			return queries;
		},
		cacheNewQueryReponseReply: function(queries, reply){
			console.log(reply);
			var query = _.find(queries, {id: reply.query});
			var response = _.find(query.responses, {id: reply.response});
			
			response.replies = response.replies || [];
			response.replies.push(reply);
			
			return queries;
		}
		/*
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
		*/
		/*
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
		*/
		/*
		cacheQueryAllResponses: function(queries, id, responses){
			var query = _.find(queries, {id: id});
						_.merge(query.responses, responses);
			return responses;
		}
		*/

	};

});