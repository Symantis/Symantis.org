angular.module( 'services.cache', ['lodash'])

.service('cache', function(lodash, config, $timeout, QueryModel) {

	return {
		checkUserCache: function(users, identifier){
			return _.some(users, {handle: identifier});
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
		cacheNewQuery: function(queries, query){
			return queries.push(query);
		},
		getCachedQuery: function(queries, id){
			return _.find(queries, {id: id});
		},

	};

});