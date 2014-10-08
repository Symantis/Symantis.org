angular.module( 'services.utils', ['lodash'])

.service('utils', function(lodash, config, $timeout) {

	return {
		prepareUrl: function(uriSegments) {
			if (lodash.isNull(config.apiUrl)) {
				apiUrl = 'https://api.test';
			}
			else {
				apiUrl = config.apiUrl;
			}

			return apiUrl + "/" + uriSegments;
		},

		showDatetime: function(string, format) {
			return moment(string).fromNow();
		},
		sectionAlert: function(alerts, data){
			data.id = Date.now();
			alerts.push(data);
			//$timeout(function(){alerts.splice(index, 1)}, 5000);
			$timeout(function(){lodash.remove(alerts, {id: data.id})},5000);
			return;
		},
		findUserMatches: function(to,from){
			
			var merged = _.union(to, from);
			var tos = _.keys(_.groupBy(merged, 'to'));
			var froms = _.keys(_.groupBy(merged, 'from'));
			var diff = froms.length > tos.length ?  _.difference(froms, tos) : _.difference(tos, froms);
			return diff;
		}

	};

});