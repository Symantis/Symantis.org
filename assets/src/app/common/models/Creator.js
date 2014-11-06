angular.module('models.creator', [
	'lodash', 
	'services', 
	//'ngSails', 
	'sails.io'
])

.run(function($sailsSocket, CreatorService){
	
	console.log("listening to creator changes");
    /*
    $sailsSocket.subscribe('demo', function(envelope){
        console.log(envelope);
        CreatorService.handler[envelope.verb](envelope)
    });
	*/

})

.service('CreatorModel', function($q, lodash, utils, $sailsSocket) {
	this.subscribeToDemo = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('creator/demo');

		$sailsSocket.get(url, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};
	this.dragBlock = function(model) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('creator/demo/drag');

		$sailsSocket.post(url, model, function(newModel) {
			return deferred.resolve(newModel);
		});
		return deferred.promise;
	};
	this.resizeBlock = function(model) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('creator/demo/resize');

		$sailsSocket.post(url, model, function(newModel) {
			return deferred.resolve(newModel);
		});
		return deferred.promise;
	};
})
.factory('CreatorService',function( $sailsSocket){
	var _service = {};
	var _handler = {};

	_handler.created = function(envelope){
        "use strict";
        //UserDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        //UserDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        //envelope.data.id = envelope.id;
        //UserDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.addedTo = function(envelope){
        "use strict";
        console.log(envelope);
    };
    _handler.removedFrom = function(envelope){
        "use strict";
        console.log(envelope);
    };

	return {
		service : _service,
		handler : _handler
	}
});