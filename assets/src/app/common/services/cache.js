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
			if(this.checkQueryCache(queries, id)){
				return this.getCachedQuery(queries, id);
			}else{
				 var self = this;
				 console.log(this);
				 return QueryModel.getOne(id).then(function(query){
				 	return self.cacheNewQuery(queries, query);
				 });
			}
		},
		resolveQueriesCache: function(){
			console.log("getting queries...");
			return queries = QueryModel.getAll().then(function(models){
				console.log(models);	
				return models;
			});
		},
		cacheQueries: function(queries){
			if(queries.length == 0){
				return queries = QueryModel.getAll();
			}else{
			    return queries;
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

			return _.map(query.responses, function(response){
				
				response = self.cacheQueryReponse(response);
				console.log(response);
				return response;
				
				/*
				var deferred = $q.defer();
				self.cacheQueryReponse(response, function(model){
					console.log(model);
					return deferred.resolve(model);
				});
				return deferred.promise;
				*/
				
			});
			//console.log(query.responses = responses);
			//return query.responses = responses;
				/*
				var self = this;
				return QueryModel.getResponses(id).then(function(responses){
					return self.cacheQueryResponses(queries, id, responses)
				});
				*/
			//}else{

			//}
		},
		cacheQueryReponse: function(response){
			
			if(response.cached){
				 return response;
			}else{
				
				return response = QueryModel.getResponse(response.id);
				
				/*
				return response =  QueryModel.getResponse(response.id).then(function(model){
					model.cached = true;
					//$rootScope.$digest();
					return model;
				});
				*/
				
				/*
				var deferred = $q.defer();
				QueryModel.getResponse(response.id).then(function(model){
					model.cached = true;
					return deferred.resolve(model);
				});
				return deferred.promise;
				*/

			}
			//return cb(response);
		},
		cacheQueryAllResponses: function(queries, id, responses){
			var query = _.find(queries, {id: id});
						_.merge(query.responses, responses);
			return responses;
		}

	};

});