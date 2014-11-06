angular.module('models.queryDS', [
    'sails.io',
    'angular-data.DS',
    'angular-data.DSCacheFactory',
    //'angular-data.DS.DSSailsSocketAdapter'
])
.run(function($sailsSocket, DS, QueryDS, QueryService, QueryResponseService, QueryCommentService){
	
	console.log("listening to query changes");
    $sailsSocket.subscribe('query', function(envelope){
        console.log("Query Socket");
        QueryService.handler[envelope.verb](envelope);
    });

    $sailsSocket.subscribe('response', function(envelope){
        console.log("Response Socket");
        QueryResponseService.handler[envelope.verb](envelope);
    });
    $sailsSocket.subscribe('comment', function(envelope){
        console.log("Comment Socket");
        QueryCommentService.handler[envelope.verb](envelope);
    });
})
.factory('QueryDS', function (DS, QueryResponseDS) {
	return DS.defineResource({
		name: 'queries',
		idAttribute: 'id',
		endpoint: '/query',
		baseUrl: '/api',
        
        relations: {
            hasMany: {
                queryresponses: {
                    localField: 'responses',
                    foreignKey: 'query'
                }
            }
        }
        
        //defaultAdapter: 'DSSailsSocketAdapter'

    });
})

.factory('QueryResponseDS', function (DS, QueryCommentDS) {
    return DS.defineResource({
        name: 'queryresponses',
        idAttribute: 'id',
        endpoint: '/response',
        baseUrl: '/api',
        
        relations: {
            belongsTo: {
                queries: {
                    localField: 'responses',
                    localKey: 'query'
                }
            },
            hasMany: {
                responsecomments: {
                    localField: 'replies',
                    foreignKey: 'response'
                }
            }
        }
        
        //defaultAdapter: 'DSSailsSocketAdapter'

    });
})

.factory('QueryCommentDS', function (DS) {
    return DS.defineResource({
        name: 'responsecomments',
        idAttribute: 'id',
        endpoint: '/comment',
        baseUrl: '/api',
        relations: {
            belongsTo: {
                queryresponses: {
                    localField: 'replies',
                    localKey: 'response'
                }
            }
        }
        //defaultAdapter: 'DSSailsSocketAdapter'

    });
})
.factory('QueryService',function(QueryDS, QueryResponseDS, $sailsSocket){
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
        if(envelope.attribute == "responses"){
            QueryResponseDS.find(envelope.addedId);
        }
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
})
.factory('QueryResponseService',function(QueryResponseDS, QueryCommentDS, $sailsSocket){
    var _service = {};
    var _handler = {};

    _handler.created = function(envelope){
        "use strict";
        QueryResponseDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        QueryResponseDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        //envelope.data.push({id: envelope.id});
        envelope.data.id = envelope.id;
        console.log(envelope);
        QueryResponseDS.inject(envelope.data);
        

    };
    _handler.addedTo = function(envelope){
        "use strict";
        if(envelope.attribute == "replies"){
            QueryCommentDS.find(envelope.addedId);
        }
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
})
.factory('QueryCommentService',function(QueryCommentDS, $sailsSocket){
    var _service = {};
    var _handler = {};

    _handler.created = function(envelope){
        "use strict";
        QueryCommentDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        QueryCommentDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        //envelope.data.push({id: envelope.id});
        envelope.data.id = envelope.id;
        console.log(envelope);
        QueryCommentDS.inject(envelope.data);
        

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