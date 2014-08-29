angular.module("sy.templates", ['sy.templates.sitenav']);

/*
 * sySiteNavToggle - Provides site nav menu functionality
 * @restrict class or attribute
 * @example:

 */
angular.module('sy.templates.sitenav', [])

.directive('sySiteNavToggle', ['$document', '$window', '$location', '$timeout', function ($document, $window, $location, $timeout) {
	var openElement = null,
		closeMenu   = angular.noop,
		openMenu	= angular.noop;
	return {
	    restrict: 'CA',
	    scope: {
      		sySiteNavToggle: '@'
    	},
    	link: function(scope, element, attrs) {

	    	var menuContainer = angular.element($document[0].querySelector(scope.sySiteNavToggle));
	    	var menuTrigger = angular.element($document[0].querySelector('#sitenavtrigger'));
	    	var menu = angular.element($document[0].querySelector('#sitenav'));
	      	//console.log(menu);

	    	scope.$watch('$location.path', function() { 
	    		console.log("location changed");
	    		closeMenu(); 
	    	});

	      //console.log(element);
	      /*
	      menuTrigger.bind('click', function (event) {
	      	console.log("Clicked");
	      });
		*/
			var trytimeout = angular.noop;

	    	element.children('#sitenav').bind('mouseenter', function (event) {
	    		console.log("Mouse Left");
				$timeout.cancel(trytimeout);
				trytimeout = $timeout(function(){
					closeMenu()
				}, 500);


	    	});
	    	element.children('#sitenav').bind('mouseleave', function (event) {
	     		console.log("Mouse Enter");
	     		$timeout.cancel(trytimeout);
	     		trytimeout = $timeout(function(){
					openMenu()
				}, 500);
	    	});

	    	element.bind('click', function (event) {
	        
	    		var menuWasOpen = element.hasClass('sy-menu-open');
	        
	    		if (menuWasOpen) {
	        		closeMenu();
	    		}
	    		if (!menuWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
	    			openMenu();
	    		}
	      	});
			
			closeMenu = function (event) {
				$document.unbind('click', closeMenu);
	          	console.log("Close Menu");
	          	menuContainer.removeClass('sy-menu-open');
	          	$timeout.cancel(trytimeout);
	          	//closeMenu = angular.noop;
	        }
	        //$document.bind('click', closeMenu);
	        openMenu = function (event) {
	        	console.log("Open Menu");
	        	menuContainer.addClass('sy-menu-open');
	        	$timeout.cancel(trytimeout);
	        	//openMenu = angular.noop;
	        }
	  	}
	}
}]);