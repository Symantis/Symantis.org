angular.module('models.systemDS', [
    'sails.io',
    'angular-data.DS',
    'angular-data.DSCacheFactory',
    //'angular-data.DS.DSSailsSocketAdapter'
])
.run(function($sailsSocket, DS, SystemDS, SystemService){
	
	console.log("listening to system changes");
    $sailsSocket.subscribe('system', function(envelope){
        //console.log(envelope);
        SystemService.handler[envelope.verb](envelope)
    });

})
.factory('SystemDS', function (DS) {
	return DS.defineResource({
		name: 'system',
		idAttribute: 'sha',
		endpoint: '/commits',
		baseUrl: '/api/system'
    });
})
.factory('SystemService',function(SystemDS, $sailsSocket){
    var _service = {};
    var _handler = {};

    _handler.created = function(envelope){
        "use strict";
        SystemDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        SystemDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        envelope.data.id = envelope.id;
        SystemDS.inject(envelope.data);
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