angular.module("sy.templates", ['sy.templates.sitenav']);

/*
 * sySiteNavToggle - Provides site nav menu functionality
 * @restrict class or attribute
 * @example:

 */
angular.module('sy.templates.sitenav', [])

.directive('sySiteNavToggle', ['$document', '$window', '$location', function ($document, $window, $location) {
	var openElement = null,
		closeMenu   = angular.noop;
	return {
	    restrict: 'CA',
	    scope: {
	      
	    }
	};

}]);