angular.module( 'services.cache', ['lodash'])

.service('cache', function(lodash, config, $timeout, UserModel, QueryModel) {

	return {
		
		resolveUserCache: function(users, handle){
			if(this.checkUserCache(users, handle)){
				return this.getCachedUser(users, handle);
			}else{
				 var self = this;
				 console.log(handle);				 
				 return UserModel.getOneHandle(handle).then(function(user){
				 	self.cacheNewUser(users, user);
				 	console.log(user);
				 	return user;
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
			return users.push(user);
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
				 	//return self.cacheNewQuery(queries, query);
				 	//console.log(query);
				 	//queries.push(query);
				 	return query;
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
		}

	};

});