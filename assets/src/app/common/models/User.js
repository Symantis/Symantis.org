angular.module('models.user', ['lodash', 'services', 'ngSails',])

.service('UserModel', function($http, $q, lodash, utils, $sails) {
	
	this.getAll = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user');

		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};

	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user/' + id);
		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.getOneHandle = function(handle) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user/handle/' + handle);
		/*
		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
		*/
		
		$http.get(url).then(function(user){
			//console.log(user.data);
			//return user.data;
			return deferred.resolve(user.data);
			
		});
		return deferred.promise;
		
		/*
		$sails.get(url, function(model) {
			console.log(model);
			return model;
		});	
		*/
		/*
		var deferred = $q.defer();
		console.log("Getting " + handle);
		
		$sails.get(url, function(model) {
			
			return deferred.resolve(model);
		});
		*/

		//return deferred.promise;
		
	};

	/*
	this.getOneByHandle = function(handle) {
		
		//console.log(handle);

		var deferred = $q.defer();
		var url = utils.prepareUrl('user/handle/' + handle);
		//url = utils.prepareUrl('user/handle/Scottie');
		$sails.get(url, function(model) {
			//console.log("Getting User...");
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	*/


	this.getOneByHandle = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user/handle/' + id);

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

	this.create = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.connect = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user/connect');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.updateStatus = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user/status');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.update = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('user/update');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
});