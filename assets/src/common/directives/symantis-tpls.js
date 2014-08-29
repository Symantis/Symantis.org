angular.module("sy.templates", ['sy.templates.sitenav']);

/*
 * sySiteNavToggle - Provides site nav menu functionality
 * @restrict class or attribute
 * @example:

 */
angular.module('sy.templates.sitenav', [])
.directive('syNav', ['$document', '$window', '$location', '$state', '$timeout', function ($document, $window, $location, $state, $timeout) {
	 return {
            //scope: {},
            restrict: 'C',
            link: function ($scope, element, attrs) {
                var win = angular.element($window);
                var sidebar = $scope.sidebar = element;
                var menuOpen = $scope.menuOpen = false;
                var trytimeout = $scope.trytimeout = angular.noop;
                //$scope.open = false;

                $scope.hide = function () {
                    menuOpen = false;
                    $timeout.cancel(trytimeout);
                    $scope.$broadcast('trytimeout', { status: 'canceled'});
                    sidebar.removeClass('sy-menu-open');
                    $scope.$broadcast('menuOpened', { status: menuOpen});
                    //console.log($scope.menuOpen);
                };
                $scope.show = function () {
                    menuOpen = true;
                    $timeout.cancel(trytimeout);
                    $scope.$broadcast('trytimeout', { status: 'canceled'});
                    sidebar.addClass('sy-menu-open');
                    $scope.$broadcast('menuOpened', { status: menuOpen});
                    //console.log($scope.menuOpen);
                };
                $scope.toggle = function () {
					menuOpen = menuOpen == true ? false : true;
                	$timeout.cancel(trytimeout);
                	$scope.$broadcast('trytimeout', { status: 'canceled'});
                	sidebar.toggleClass("sy-menu-open");
                	$scope.$broadcast('menuOpened', { status: menuOpen});
                	//console.log($scope.menuOpen);
                }
                
                win.bind("resize.body", $scope.hide);

                $scope.$on('$destroy', function() {
                    win.unbind("resize.body", $scope.hide);
                });

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    			console.log("state changed");
	    			$scope.hide();
	    		});
                /*
	    		$scope.$on('menuOpened', function(event, status){
	    			console.log(status);
	    			console.log("menu updated");
	    			
	    		});
				*/

            },
            controller: ['$scope', function($scope) {
            	//$scope.open = false;
            	//$scope.menuOpen = false;

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
                    $scope.toggle();
                    //console.log($scope.menuOpen);
                };
                this.hide = function() {
                    $scope.hide();
                     //console.log($scope.menuOpen);
                };
                this.show = function() {
                    $scope.show();
                     //console.log($scope.menuOpen);
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
.directive('syNavMenu', ['$timeout', function ($timeout) {
        return {
            require: '^syNav',
            restrict: 'C',
            link: function ($scope, element, attrs, syNav) {
                
                element.on('mouseenter mouseleave', function (e) {
                    //console.log(e.type);
                    $timeout.cancel($scope.trytimeout);
                    var action = function(){
                    	return e.type == 'mouseover' ? syNav.show() : syNav.hide();
                    }
                    $scope.trytimeout = $timeout(function(){
						action()
					}, 1000);
                    //var action = e.type == 'mouseover' ? syNav.bottomOpen() : syNav.bottomClose();
                });
                $scope.$on('trytimeout', function(event, status){
	    			//console.log(status);
	    			$timeout.cancel($scope.trytimeout);
	    		});
            }
        };
}])
.directive('activatorIcon', [function ($timeout) {
        return {
            require: '^syNav',
            restrict: 'C',
            link: function ($scope, element, attrs, syNav) {
				
				var trident = 'M572.6,366.1l-94.2-79.2c-13.2-11.4-32.6-9.7-44,3.5v0.9c-11.4,13.2-9.7,32.6,3.5,44l27.3,22.9l-308.9-1.8 l227-225.3l-5.3,39.6c-2.6,16.7,9.7,32.6,26.4,34.3h0.9c16.7,2.6,32.6-9.7,34.3-26.4l15.8-122.3c1.8-13.2,1.8-27.3-8.8-37.8 c-8.8-9.7-22.9-13.2-37-12.3l-123.2,9.7c-16.7,1.8-29.9,16.7-28.2,33.4v0.9c1.8,16.7,16.7,29.9,33.4,28.2l35.2-2.6L45.5,355.5 c-3.5,3.5-8.8,8.8-12.3,13.2c-6.2,7.9-8.8,15.8-8.8,27.3v0.9c0,11.4,2.6,20.2,11.4,28.2c2.6,3.5,7,7.9,9.7,10.6L328,715.4l-35.2-2.6 c-16.7-1.8-31.7,11.4-33.4,28.2v0.9c-1.8,16.7,11.4,31.7,28.2,33.4l123.2,9.7c13.2,0.9,28.2-2.6,37.8-12.3 c10.6-10.6,10.6-24.6,8.8-37.8l-15.8-122.3c-2.6-16.7-17.6-29-34.3-26.4h-0.9c-16.7,2.6-29,17.6-26.4,34.3l5.3,39.6L159,435.6 l306.2,0.9l-30.8,23.8c-13.2,10.6-15.8,29.9-5.3,43.1l0.9,0.9c10.6,13.2,29.9,15.8,43.1,5.3l97.7-75.7c10.6-7.9,20.2-17.6,20.2-32.6 C591.1,388.1,583.2,374.9,572.6,366.1z'
               	var cross = 'M562.4,745l34-118.3c5-16.7-4.4-33.7-21.1-38.8l-0.8,0.4c-16.7-5-33.7,4.4-38.8,21.1l-9.8,34.3L366.3,356.4l157-215.3l-5.3,39.6c-2.6,16.7,9.7,32.6,26.4,34.3h0.9c16.7,2.6,32.6-9.7,34.3-26.4l15.8-122.3c1.8-13.2,1.8-27.3-8.8-37.8c-8.8-9.7-22.9-13.2-37-12.3l-123.2,9.7c-16.7,1.8-29.9,16.7-28.2,33.4v0.9c1.8,16.7,16.7,29.9,33.4,28.2l35.2-2.6L255.5,355.5C252,359,50.5,57.6,47,62c-6.2,7.9-19,53.5-19,65l-9,21c0,11.4,218,269.1,226.8,277.1c2.6,3.5,7,7.9,9.7,10.6L60,624v41c-16.7-1.8,6.7,10.2,5,27l29,1c-1.8,16.7,21.2-0.7,38,1l12.6,4.1c13.2,0.9,3.8,6.6,13.4-3.1c10.6-10.6,25.8-0.8,24-14l7-18c-2.6-16.7,27.4-9.2,10.7-6.6L196,648c-16.7,2.6-2.6-26.7,0-10l8-20l165-182.4l85.4,239.9L420.2,657c-15.1-7.7-33.7-2.3-41.5,12.7l-0.5,1.2c-7.7,15.1-2.3,33.7,12.7,41.5l108.9,58.5c11.5,6.5,24.3,11.3,38,5.2C549.9,770.8,558.7,758.2,562.4,745z';
               	//$scope.currentShape = $scope.trident;
               	var svg = d3.select(element[0])
          			.append("svg")
          			//.attr("xmls", "http://www.w3.org/2000/svg")
          			//.attr('animate')
          			.attr('height', 26)
                	.attr('width', 20)
                	.attr('x', "0px")
                	.attr('y', "0px")
                	.attr('viewBox', "0 0 612 792")
                var path = svg.append("path")
                	.attr('class', 'trident')
                	.attr('d', trident);

                $scope.$on('menuOpened', function(event, status){
	    			//console.log(status);
	    			console.log("menu updated "+ status.status);
	    			if(status.status == false){
	    				//$scope.currentShape = $scope.trident;
	    				path.attr('d', trident)
	    					.attr("transform", null)
  							.transition()
    						.ease("linear");
	    			}else{
	    				//$scope.currentShape = $scope.cross;
	    				path.attr('d', cross)
	    				.attr("transform", null)
  						.transition()
    					.ease("linear");
	    			}
	    			
	    		});
                /*
                	.append('svg')
                	.attr('height', 400)
                	.attr('width', 400);
                var circle = canvas.append('circle')
                	.attr('cx', 50)
                	.attr('cy', 50)
                	.attr('r',50);
                */

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
}])

.directive('topNav', ['$document', '$window', '$location', '$state', '$timeout', function ($document, $window, $location, $state, $timeout) {
	 return {
            scope: {},
            restrict: 'C',
            link: function ($scope, element, attrs) {
                var win = angular.element($window);
                var topbar = $scope.topbar = element;
                

            },
            controller: ['$scope', function($scope) {

                
            }]
	};
}])
.directive('topNavContainer', ['$document','$window','$state' ,function ($document, $window, $state) {
        return {
            require: '^topNav',
            restrict: 'C',
            link: function ($scope, element, attrs, topNav) {
                //console.log(element.$parent());
	            var win = angular.element($window);

	            element.css({ 
			    	width: element.parent()[0].offsetWidth - 65 + 'px' 
			    });
			    win.bind("resize", function(){
			    	element.css({ 
				    	width: element.parent()[0].offsetWidth - 65 + 'px' 
				    });
			    });
			    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    			element.css({ 
				    	width: element.parent()[0].offsetWidth - 65 + 'px' 
				    });
	    		});
            }
        };
}]);