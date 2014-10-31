angular.module('models.news', ['lodash', 'services', 'ngSails',])

.service('NewsModel', function($q, lodash, utils, $sails) {

	this.getAll = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('news');

		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};
	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('article/' + id);
		//console.log(id);
		$sails.get(url, function(models) {
			//console.log(models[0]);
			return deferred.resolve(models[0]);
		});

		return deferred.promise;
	};

	

});