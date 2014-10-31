angular.module('models.news', ['lodash', 'services', 'ngSails',])

.service('NewsModel', function($q, lodash, utils, $sails) {

	this.getAll = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('wordpress');

		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};

	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('wordpress/' + id);

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

});