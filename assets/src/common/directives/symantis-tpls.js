angular.module("sy.templates", ['sy.templates.sitenav']);

/*
 * sySiteNavToggle - Provides site nav menu functionality
 * @restrict class or attribute
 * @example:

 */
angular.module('sy.templates.sitenav', [])

.directive('sySiteNavToggle', ['$document', '$window', '$location', '$state', '$timeout', function ($document, $window, $location, $state, $timeout) {
	var openElement = null,
		closeMenu   = angular.noop,
		openMenu	= angular.noop,
		toggleMenu	= angular.noop;
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
	    	scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    		console.log("state changed");
	    		closeMenu(); 
	    	});

	      //console.log(element);
	      /*
	      menuTrigger.bind('click', function (event) {
	      	console.log("Clicked");
	      });
		*/
			var trytimeout = angular.noop;

	    	element.children('.sitenav-inner').bind('mouseenter mouseleave', function (e) {
	    		//element.children('.sitenav-inner').unbind('mouseenter mouseleave');
	    		e = e ? e : window.event;
			    var from = e.relatedTarget || e.toElement;
			    if (!from || from.nodeName == "HTML") {
			    	console.log('Left Window');
			    	$timeout.cancel(trytimeout);
			    }else{
		    		console.log(e.type);
					$timeout.cancel(trytimeout);
					var action = function(){ 
						return e.type == 'mouseover' ? closeMenu() : openMenu();
					}
					trytimeout = $timeout(function(){
						action()
					}, 500);
			        // stop your drag event here
			        // for now we can just use an alert
			        //alert("left window");
			    }
	    	});
	    	element.children('.sitenav-inner').bind('click', function (e) {
	    		console.log('Clicked');
	    	});
	    	/*
	    	element.children('#sitenav').bind('mouseleave', function (event) {
	     		console.log("Mouse Enter");
	     		$timeout.cancel(trytimeout);
	     		trytimeout = $timeout(function(){
					openMenu()
				}, 500);
	    	});
			*/
			/*
			$('.symenutrigger').bind('click', function (event){
				console.log("Clicked");
				var menuWasOpen = element.hasClass('sy-menu-open');
	        
	    		if (menuWasOpen) {
	        		closeMenu();
	    		}
	    		if (!menuWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
	    			openMenu();
	    		}
			});
	*/
			/*
	    	element.bind('click', function (event) {
	        
	    		var menuWasOpen = element.hasClass('sy-menu-open');
	        
	    		if (menuWasOpen) {
	        		closeMenu();
	    		}
	    		if (!menuWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
	    			openMenu();
	    		}
	      	});
			*/
			
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