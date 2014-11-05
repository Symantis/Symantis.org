angular.module('models.queryDS', [
    'sails.io',
    'angular-data.DS',
    'angular-data.DSCacheFactory',
    //'angular-data.DS.DSSailsSocketAdapter'
])
.run(function($sailsSocket, DS, QueryDS, QueryService){
	
	console.log("listening to query changes");
    $sailsSocket.subscribe('query', function(envelope){
        QueryService.handler[envelope.verb](envelope);
    });

})
.factory('QueryDS', function (DS) {
	return DS.defineResource({
		name: 'queries',
		idAttribute: 'id',
		endpoint: '/query',
		baseUrl: '/api',
        //defaultAdapter: 'DSSailsSocketAdapter'

    });
})
.factory('QueryService',function(QueryDS, $sailsSocket){
	var _service = {};
	var _handler = {};

	_handler.created = function(envelope){
        "use strict";
        QueryDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        QueryDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        //envelope.data.push({id: envelope.id});
        envelope.data.id = envelope.id;
        console.log(envelope);
        QueryDS.inject(envelope.data);
        

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