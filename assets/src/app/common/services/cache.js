angular.module( 'services.cache', ['lodash'])

.service('cache', function(lodash, config, $timeout, UserModel, QueryModel) {

	return {
		
		resolveUserCache: function(users, id){
			if(this.checkUserCache(users, id)){
				return this.getCachedUser(users, id);
			}else{
				 var self = this;
				 return UserModel.getOne(id).then(function(user){
				 	self.cacheUserQuery(users, user);
				 	console.log(user);
				 	return user;
				 });
			}
		},
		checkUserCache: function(users, identifier){
			return _.some(users, {handle: identifier});
		},
		cacheUpdatedUser: function(users, id, data){
			var user = _.find(users, {id: id});
					   _.merge(user, data);
			return users;
		},
		cacheNewUser: function(users, user){
			return users.push(user);
		},
		getCachedUser: function(users, identifier){
			return _.find(users, {handle: identifier});
		},
		cacheUser: function(users, user){
			_.map(users,function(u){
     			return (u.handle === user.handle) ? user : u;
			})
		},

		resolveQueryCache: function(queries, id){
			if(this.checkQueryCache(queries, id)){
				return this.getCachedQuery(queries, id);
			}else{
				 var self = this;
				 return QueryModel.getOne(id).then(function(query){
				 	self.cacheNewQuery(queries, query);
				 	console.log(query);
				 	return query;
				 });
			}
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
			return queries.push(query);
		},
		getCachedQuery: function(queries, id){
			return _.find(queries, {id: id});
		},
		removeQueryFromCache: function(queries, id){
			return _.remove(queries, {id: id});
		}

	};

});