angular.module('models.query', ['lodash', 'services', 'ngSails',])

.service('QueryModel', function($q, lodash, utils, $sails) {

	this.create = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

});