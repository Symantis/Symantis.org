angular.module('models.system', ['lodash', 'services', 'ngSails',])

.service('SystemModel', function($q, lodash, utils, $sails) {

	this.getRecentCommits = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('system/commits');

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

});