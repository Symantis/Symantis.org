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
	this.getResponses = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('response/query/' + id);
		//console.log("Getting Responses: "+id);
		
		$sails.get(url, function(models) {
			console.log(models);
			return deferred.resolve(models);
		});

		return deferred.promise;
	};
	this.getResponse = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('response/' + id);
		//console.log("Getting Response: "+id);
		$sails.get(url, function(model) {
			//console.log(model);
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.getReply = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('response/reply/' + id);
		//console.log("Getting Response: "+id);
		$sails.get(url, function(model) {
			//console.log(model);
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

	this.addResponse = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('query/response');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

	this.addReply = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('response/reply');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};
	this.addSolution = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('response/solve');

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