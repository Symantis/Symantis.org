angular.module('models.creator', ['lodash', 'services', 'ngSails',])

.service('CreatorModel', function($q, lodash, utils, $sails) {
	this.subscribeToDemo = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('creator/demo');

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};
	this.dragBlock = function(model) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('creator/demo/drag');

		$sails.post(url, model, function(newModel) {
			return deferred.resolve(newModel);
		});
		return deferred.promise;
	};
	this.resizeBlock = function(model) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('creator/demo/resize');

		$sails.post(url, model, function(newModel) {
			return deferred.resolve(newModel);
		});
		return deferred.promise;
	};
});