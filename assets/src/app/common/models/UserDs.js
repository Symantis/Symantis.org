angular.module('models.userDS', [
    'sails.io',
    'angular-data.DS',
    'angular-data.DSCacheFactory',
    //'angular-data.DS.DSSailsSocketAdapter'
])
.run(function($sailsSocket, DS, UserDS, UserService){
	
	console.log("listening to user changes");
    $sailsSocket.subscribe('user', function(envelope){
        //console.log(envelope);
        UserService.handler[envelope.verb](envelope)
    });

})
.factory('UserDS', function (DS) {
	return DS.defineResource({
		name: 'users',
		idAttribute: 'id',
		endpoint: '/user',
		baseUrl: '/api'
    });
})
.factory('UserService',function(UserDS, $sailsSocket){
	var _service = {};
	var _handler = {};

	_handler.created = function(envelope){
        "use strict";
        UserDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        UserDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        envelope.data.id = envelope.id;
        UserDS.inject(envelope.data);
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