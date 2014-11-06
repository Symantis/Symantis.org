angular.module('models.newsDS', [
    'sails.io',
    'angular-data.DS',
    'angular-data.DSCacheFactory',
    //'angular-data.DS.DSSailsSocketAdapter'
])
.run(function($sailsSocket, DS, NewsDS, NewsService){
	
	console.log("listening to news changes");
    $sailsSocket.subscribe('news', function(envelope){
        //console.log(envelope);
        NewsService.handler[envelope.verb](envelope)
    });

})
.factory('NewsDS', function (DS) {
	return DS.defineResource({
		name: 'news',
		idAttribute: 'id',
		endpoint: '/news',
		baseUrl: '/api'
    });
})
.factory('NewsService',function(NewsDS, $sailsSocket){
	var _service = {};
	var _handler = {};

	_handler.created = function(envelope){
        "use strict";
        NewsDS.inject(envelope.data);
        console.log(envelope);

    };
    _handler.deleted = function(envelope){
        "use strict";
        NewsDS.eject(envelope.id);
        console.log(envelope);

    };
    _handler.updated = function(envelope){
        "use strict";
        NewsDS.inject(envelope.data);
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