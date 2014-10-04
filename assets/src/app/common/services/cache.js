angular.module( 'services.cache', ['lodash'])

.service('cache', function(lodash, config, $timeout) {

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
			_.map(users,function(user){
     			return (el==='a') ? x : el;
			})
		},



		checkQueryCache: function(queries, id){
			return _.some(queries, {id: id});
		},
		cacheNewQuery: function(queries, query){
			return queries.push(query);
		},

	};

});