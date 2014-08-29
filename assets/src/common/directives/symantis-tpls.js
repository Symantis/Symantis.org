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

    		console.log(attrs);
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
	    		e = e ? e : document.event;
			    var from = e.relatedTarget || e.toElement;
			    if (!from || from.nodeName == "HTML") {
			    	console.log('Left Window');
			    	$timeout.cancel(trytimeout);
			    }else{
					$timeout.cancel(trytimeout);
					var action = function(){ 
							console.log(e.type);
							var actionType = angular.noop;
							switch(e.type) {
								case 'mouseover':
									//console.log(e.type);
									actionType = closeMenu();
									break;
								case 'mouseout':
									//console.log(e.type);
									actionType = openMenu();
									break;
								default:
									actionType = closeMenu();
							}
							return actionType;
						//return e.type == 'mouseover' ? closeMenu() : openMenu();
					}
					trytimeout = $timeout(function(){
						action()
					}, 500);
			    }
	    	});
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
				//$document.unbind('click', closeMenu);
	          	//console.log("Close Menu");
	          	menuContainer.removeClass('sy-menu-open');
	          	$timeout.cancel(trytimeout);
	          	//closeMenu = angular.noop;
	        }
	        //$document.bind('click', closeMenu);
	        openMenu = function (event) {
	        	//console.log("Open Menu");
	        	menuContainer.addClass('sy-menu-open');
	        	$timeout.cancel(trytimeout);
	        	//openMenu = angular.noop;
	        }
	  	}
	}
}])

.directive('syNav', ['$document', '$window', '$location', '$state', '$timeout', function ($document, $window, $location, $state, $timeout) {
	 return {
            scope: {},
            restrict: 'C',
            link: function ($scope, element, attrs) {
                var win = angular.element($window);
                var sidebar = $scope.sidebar = element;

                $scope.hide = function () {
                    sidebar.removeClass('sy-menu-open');
                    //sidebar.removeClass('move-right');
                };
                $scope.show = function () {
                    sidebar.addClass('sy-menu-open');
                    //sidebar.removeClass('move-right');
                };

                win.bind("resize.body", $scope.hide);

                $scope.$on('$destroy', function() {
                    win.unbind("resize.body", $scope.hide);
                });
                /*
                $document.bind('click', function( e ){
                	$scope.hide();
                });
				*/

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    			console.log("state changed");
	    			$scope.hide();
	    		});

            },
            controller: ['$scope', function($scope) {

                this.topToggle = function() {
                    $scope.sidebar.toggleClass("sy-menu-top-open");
                };
                this.topOpen = function() {
                    $scope.sidebar.addClass("sy-menu-top-open");
                };
                this.topClose = function() {
                    $scope.sidebar.removeClass("sy-menu-top-open");
                };


                this.bottomToggle = function() {
                    $scope.sidebar.toggleClass("sy-menu-bottom-open");
                };
                this.bottomOpen = function() {
                    $scope.sidebar.addClass("sy-menu-bottom-open");
                };
                this.bottomClose = function() {
                    $scope.sidebar.removeClass("sy-menu-bottom-open");
                };

                this.toggle = function() {
                    $scope.sidebar.toggleClass("sy-menu-open");
                };
                this.hide = function() {
                    $scope.hide();
                };
                this.show = function() {
                    $scope.show();
                };
            }]
	};
}])
.directive('syNavToggle', [function () {
        return {
            require: '^syNav',
            restrict: 'C',
            link: function ($scope, element, attrs, syNav) {
                element.on('click', function () {
                    syNav.toggle();
                });
            }
        };
}])
.directive('syNavTopToggle', [function () {
        return {
            require: '^syNav',
            restrict: 'C',
            link: function ($scope, element, attrs, syNav) {
                element.on('click', function () {
                    syNav.topToggle();
                });
                element.on('mouseenter mouseleave', function (e) {
                    var action = e.type == 'mouseover' ? syNav.topOpen() : syNav.topClose();
                    //syNav.topOpen();
                });
            }
        };
}])
.directive('syNavBottomToggle', [function () {
        return {
            require: '^syNav',
            restrict: 'C',
            link: function ($scope, element, attrs, syNav) {
                element.on('click', function () {
                    syNav.bottomToggle();
                });
                element.on('mouseenter mouseleave', function (e) {
                    var action = e.type == 'mouseover' ? syNav.bottomOpen() : syNav.bottomClose();
                });
            }
        };
}])
.directive('sitenavPush', [function () {
        return {
            require: '^syNav',
            restrict: 'C',
            link: function ($scope, element, attrs, syNav) {
                element.on('click', function () {
                    syNav.hide();
                });
            }
        };
}]);