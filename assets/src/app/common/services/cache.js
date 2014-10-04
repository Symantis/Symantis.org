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
		}
	};

});