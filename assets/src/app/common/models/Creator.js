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
});