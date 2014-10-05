angular.module('models.query', ['lodash', 'services', 'ngSails',])

.service('QueryModel', function($q, lodash, utils, $sails) {

	this.getAll = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query');

		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};

	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query/' + id);

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.create = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.update = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query/update');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.updateViews = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query/update/views');
		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

});