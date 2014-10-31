angular.module("sy.templates", [
    'sy.templates.inputs',
    'sy.templates.syapp',
    'sy.templates.sitenav', 
    'sy.templates.activity',
    'sy.templates.homeanimation', 
    'sy.templates.userimage', 
    'sy.templates.mainleft',
    'sy.templates.scroll',
    'sy.symantis.modal',
    'sy.templates.timeline',
    'sy.masonry',
    'sy.hashtagify'
]);

/*
 * sySiteNavToggle - Provides site nav menu functionality
 * @restrict class or attribute
 * @example:

 */

angular.module('sy.templates.inputs', [])
.directive('forceFocus', function($timeout) {
  return {
    replace: false,
    //scope: { trigger: '@forceFocus' },
    link: function(scope, element, attrs) {
      
      element[0].focus();

      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
  };
})
.directive("dynamicName",[function(){
    return {
        restrict:"A",
        require: ['ngModel', '^form'],
        link:function(scope,element,attrs,ctrls){
            ctrls[0].$name = scope.$eval(attrs.dynamicName) || attrs.dynamicName;
            ctrls[1].$addControl(ctrls[0]);
        }
    };
}])
.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            } else if(event.which === 9){
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
})
.directive('ngShiftTab', function() {
    return function(scope, element, attrs) {
        var map = {9: false, 16: false};

        element.bind("keydown", function(event) {
            if (event.which in map) {
                map[event.which] = true;
                if (map[9] && map[16]) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngShiftTab, {'event': event});
                    });
                    event.preventDefault();
                }
            }
        });
        element.bind("keyup", function(event) {
            if (event.which in map) {
                map[event.keyCode] = false;
            }
        });
    };
})

.directive('lowercase', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var lowercase = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var lowercase = inputValue.toLowerCase();
           if(lowercase !== inputValue) {
              modelCtrl.$setViewValue(lowercase);
              modelCtrl.$render();
            }         
            return lowercase;
         }
         modelCtrl.$parsers.push(lowercase);
         lowercase(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
})
.directive('ngUnique', ['$http', function (async) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      elem.on('keyup', function (evt) {
        scope.$apply(function () {
          var val = elem.val();
          var type = attrs.ngUnique;
          var ajaxConfiguration = { method: 'GET', url: '/api/user/'+type+'/match/'+val};
          async(ajaxConfiguration)
            .success(function(data, status, headers, config) {
              console.log(data);
              ctrl.$setValidity('unique', data.unique);
            });
          });
        });
      }
    }
  }
])
.directive('ngSearch', function() {
    return {
    require: 'ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, modelCtrl) {
        element.bind("keyup", function(event) {    
            scope.$apply(function(){
               scope.$eval(attrs.ngSearch, {'event': event});
            });
        });
    }
  }
})
.directive('same', function () {
  return {
    require: '?ngModel',
    restrict: 'A',
    scope: { same: '=' },
    link: function (scope, element, attrs, ctrl) {
        if(!ctrl) { 
            return; 
        }
        scope.$watch(
          function() {
            return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.same === ctrl.$modelValue;
          },
          function(currentValue) {
            ctrl.$setValidity('same', currentValue);
          }
        );
    }
  }
});


angular.module('sy.templates.syapp', ['duScroll'])
.directive('syApp', ['$document', '$window', '$rootScope','$state','$timeout', function ($document, $window, $state, $timeout) {
    return {
        restrict: 'C',
        link: function ($scope, element, attrs) {
            
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                console.log("state changed");
                var viewport = element;
                var top = 0;
                var duration = 0; //milliseconds
                //Scroll to the exact position
                //console.log(viewport[0].scrollTop);
                if(viewport[0].scrollTop != 0){
                    viewport.scrollTop(top, duration).then(function() {
                      console.log('You just scrolled to the top!');
                    });
                }
            });

            //Global Hot Keys
            var map = {91: false, 16: false, 76: false, 65: false, 83:false};
            $document.bind("keydown", function(event) {
                console.log(event.which);
                if (event.which in map) {
                    map[event.which] = true;
                    
                    if (map[91] && map[16] && map[76]) {
                        if (typeof ($scope.loginModal) == 'function' && !$scope.currentUser) {
                            $scope.loginModal();    
                        }
                        event.preventDefault();
                    }

                    if (map[91] && map[16] && map[65]) {
                        if (typeof ($scope.notificationsToggle) == 'function' && $scope.currentUser) {
                            $scope.notificationsToggle();    
                        }
                        event.preventDefault();
                    }
                    if (map[91] && map[16] && map[83]) {
                        
                        $state.go('search');    
                        event.preventDefault();
                    }
                }
            });
            $document.bind("keyup", function(event) {
                if (event.which in map) {
                    map[event.which] = false;
                }
            });
   
        }
    }

}]);

angular.module('sy.templates.sitenav', [])
.directive('sitenavPush', ['$document', '$window', '$rootScope', '$timeout', function ($document, $window, $timeout) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            
            element.on('mouseenter', function() {
              scope.$apply(function(){ // or $timeout(function() {
                if(scope.menuOpen){
                    scope.menuToggle();
                    //console.log(scope);
                    console.log('close menu');
                }else{
                    //console.log(scope.menuOpen);
                }
              });

            });

        }
    }

}]);
/*
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
                    if(menuOpen != false){
                        menuOpen = false;
                        $timeout.cancel(trytimeout);
                        $scope.$broadcast('trytimeout', { status: 'canceled'});
                        sidebar.removeClass('menuOpen blur');
                        $scope.$broadcast('menuOpened', { status: menuOpen});
                    }
                    //console.log($scope.menuOpen);
                };
                $scope.show = function () {
                    if(menuOpen != true){
                        menuOpen = true;
                        $timeout.cancel(trytimeout);
                        $scope.$broadcast('trytimeout', { status: 'canceled'});
                        sidebar.addClass('menuOpen blur');
                        $scope.$broadcast('menuOpened', { status: menuOpen});
                    }
                    //console.log($scope.menuOpen);
                };
                $scope.toggle = function () {
					menuOpen = menuOpen == true ? false : true;
                	$timeout.cancel(trytimeout);
                	$scope.$broadcast('trytimeout', { status: 'canceled'});
                	sidebar.toggleClass("menuOpen blur");
                	$scope.$broadcast('menuOpened', { status: menuOpen});
                	//console.log($scope.menuOpen);
                }
                
                win.bind("resize.body", $scope.hide);

                $scope.$on('$destroy', function() {
                    win.unbind("resize.body", $scope.hide);
                });


                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    			//console.log("state changed");
                    $scope.$broadcast('trytimeout', { status: 'canceled'});
	    			//$scope.hide();
                    sidebar.removeClass('blur');
	    		});
                
	    		//$scope.$on('menuOpened', function(event, status){
	    		//	console.log(status);
	    		//	console.log("menu updated");
	    			
	    		//});

            },
            controller: ['$scope', function($scope) {
            	//$scope.open = false;
            	//$scope.menuOpen = false;

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
}]);
*/
/*
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
					}, 10);
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
				
				var trident = 'M572.6,366.1l-94.2-79.2c-13.2-11.4-32.6-9.7-44,3.5v0.9c-11.4,13.2-9.7,32.6,3.5,44l27.3,22.9l-308.9-1.8 l227-225.3l-5.3,39.6c-2.6,16.7,9.7,32.6,26.4,34.3h0.9c16.7,2.6,32.6-9.7,34.3-26.4l15.8-122.3c1.8-13.2,1.8-27.3-8.8-37.8 c-8.8-9.7-22.9-13.2-37-12.3l-123.2,9.7c-16.7,1.8-29.9,16.7-28.2,33.4v0.9c1.8,16.7,16.7,29.9,33.4,28.2l35.2-2.6L45.5,355.5 c-3.5,3.5-8.8,8.8-12.3,13.2c-6.2,7.9-8.8,15.8-8.8,27.3v0.9c0,11.4,2.6,20.2,11.4,28.2c2.6,3.5,7,7.9,9.7,10.6L328,715.4l-35.2-2.6 c-16.7-1.8-31.7,11.4-33.4,28.2v0.9c-1.8,16.7,11.4,31.7,28.2,33.4l123.2,9.7c13.2,0.9,28.2-2.6,37.8-12.3 c10.6-10.6,10.6-24.6,8.8-37.8l-15.8-122.3c-2.6-16.7-17.6-29-34.3-26.4h-0.9c-16.7,2.6-29,17.6-26.4,34.3l5.3,39.6L159,435.6 l306.2,0.9l-30.8,23.8c-13.2,10.6-15.8,29.9-5.3,43.1l0.9,0.9c10.6,13.2,29.9,15.8,43.1,5.3l97.7-75.7c10.6-7.9,20.2-17.6,20.2-32.6 C591.1,388.1,583.2,374.9,572.6,366.1z';
               	var cross = 'M559.5,637.9c9.5-9.5,9.4-24.8-0.1-34.3L383.3,428.2c-9.5-9.5-9.5-24.8-0.1-34.3l175.5-176.1c9.5-9.5,9.4-24.8-0.1-34.3l-29.7-29.6c-9.5-9.5-24.8-9.4-34.3,0.1L319.1,330c-9.5,9.5-24.8,9.5-34.3,0.1L108.7,154.6c-9.5-9.5-24.8-9.4-34.3,0.1l-29.6,29.7c-9.5,9.5-9.4,24.8,0.1,34.3l176.1,175.5c9.5,9.5,9.5,24.8,0.1,34.3L45.5,604.6c-9.5,9.5-9.4,24.8,0.1,34.3l29.7,29.6c9.5,9.5,24.8,9.4,34.3-0.1l175.5-176.1c9.5-9.5,24.8-9.5,34.3-0.1l176.1,175.5c9.5,9.5,24.8,9.4,34.3-0.1L559.5,637.9z';
                //var cross = 'M559.5,637.9c9.5-9.5,9.4-24.8-0.1-34.3l-37.9-37.8l-43.3-43.1l-32.5-32.3l-40.6-40.5l-21.9-21.8c-9.5-9.5-9.5-24.8-0.1-34.3l11.5-11.6l45.2-45.3l37.1-37.2l45.8-46l35.9-36c9.5-9.5,9.4-24.8-0.1-34.3l-15.8-15.7l-14-13.9c-9.5-9.5-24.8-9.4-34.3,0.1l-38.4,38.6l-43.8,44l-37.7,37.9l-37.7,37.9L319.1,330c-9.5,9.5-24.8,9.5-34.3,0.1l-44.1-43.9L194,239.6l-35.8-35.7l-32.5-32.4l-17.1-17c-9.5-9.5-24.8-9.4-34.3,0.1l-15,15.1l-14.6,14.7c-9.5,9.5-9.4,24.8,0.1,34.3l25.7,25.6l46,45.9l45.3,45.1l32.5,32.4l26.6,26.5c9.5,9.5,9.5,24.8,0.1,34.3l-21.7,21.8l-41.1,41.3l-35.7,35.9l-49.9,50.1l-27.1,27.2c-9.5,9.5-9.4,24.8,0.1,34.3l10.4,10.3l19.4,19.3c9.5,9.5,24.8,9.4,34.3-0.1l31-31.1l49.2-49.4l39.1-39.2l38.4-38.6l17.7-17.8c9.5-9.5,24.8-9.5,34.3-0.1l19,19l37.9,37.7l52.1,51.9l32.5,32.4l34.7,34.5c9.5,9.5,24.8,9.4,34.3-0.1l12.3-12.4L559.5,637.9z';
                //var cross = 'M562.4,745l34-118.3c5-16.7-4.4-33.7-21.1-38.8l-0.8,0.4c-16.7-5-33.7,4.4-38.8,21.1l-9.8,34.3L366.3,356.4l157-215.3l-5.3,39.6c-2.6,16.7,9.7,32.6,26.4,34.3h0.9c16.7,2.6,32.6-9.7,34.3-26.4l15.8-122.3c1.8-13.2,1.8-27.3-8.8-37.8c-8.8-9.7-22.9-13.2-37-12.3l-123.2,9.7c-16.7,1.8-29.9,16.7-28.2,33.4v0.9c1.8,16.7,16.7,29.9,33.4,28.2l35.2-2.6L255.5,355.5C252,359,50.5,57.6,47,62c-6.2,7.9-19,53.5-19,65l-9,21c0,11.4,218,269.1,226.8,277.1c2.6,3.5,7,7.9,9.7,10.6L60,624v41c-16.7-1.8,6.7,10.2,5,27l29,1c-1.8,16.7,21.2-0.7,38,1l12.6,4.1c13.2,0.9,3.8,6.6,13.4-3.1c10.6-10.6,25.8-0.8,24-14l7-18c-2.6-16.7,27.4-9.2,10.7-6.6L196,648c-16.7,2.6-2.6-26.7,0-10l8-20l165-182.4l85.4,239.9L420.2,657c-15.1-7.7-33.7-2.3-41.5,12.7l-0.5,1.2c-7.7,15.1-2.3,33.7,12.7,41.5l108.9,58.5c11.5,6.5,24.3,11.3,38,5.2C549.9,770.8,558.7,758.2,562.4,745z';
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
	    				path
  						.transition()
                        .duration(400)
    					.ease("linear")
                        .attr('d', trident);
                            //.attr("transform", null);
	    			}else{
	    				//$scope.currentShape = $scope.cross;
	    				path
  						.transition()
                        .duration(400)
    					.ease("linear")
                        .attr('d', cross);
                        //.attr("transform", null);
	    			}
	    			
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
.directive('topNavContainer', ['$document','$window','$state', '$timeout' ,function ($document, $window, $state, $timeout) {
        return {
            require: '^topNav',
            restrict: 'C',
            link: function ($scope, element, attrs, topNav) {
                //console.log(element.$parent());
	            var win = angular.element($window);

                $scope.resetHeader = function(numOffset){
                    element.css({ 
                        width: element.parent()[0].offsetWidth - numOffset + 'px' 
                    });
                }

                $scope.resetHeader(50);

			    win.bind("resize", function(){
			    	$scope.resetHeader(50);
			    });
                var trytimeout = angular.noop;

			    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                   //console.log(fromState);
                    if(fromState.name == ""){
                        $scope.resetHeader(50);
                    }else{
                        $scope.resetHeader(50);
                    }
	    		});
            }
        };
}])
.directive('topNavLeft', [function(){
    return {
        require: '^topNav',
        restrict: 'C',
        //replace: true,
        transclude: true,
        template: '<div ng-transclude></div><ul id="topNavLeftNav" class="f-dropdown"><li></li></ul>',
        link: function($scope, element, attrs){
           
        }
    }
}]);
*/
angular.module('sy.templates.scroll',['duScroll'])
.directive('backToTop', ['$document','$window', function ($document, $window){
    return {
        restrict: 'C',
        link: function ($scope, element, attrs){
            
          var viewport = angular.element($document[0].querySelector('.sy-app'));
          angular.element(viewport).bind("scroll", function() {
                var scrollTop = viewport.scrollTop();
                if(scrollTop > 0){
                    $scope.hidden = false;
                }else{
                     $scope.hidden = true;
                }
         });

          $scope.scrollToTop = function(){
            
            var top = 0;
            
            var viewport = angular.element($document[0].querySelector('.sy-app'));
            var duration = (viewport[0].offsetHeight + viewport[0].scrollTop / 2); //milliseconds
            //Scroll to the exact position
            viewport.scrollTop(top, duration).then(function() {
              console.log('You just scrolled to the top!');
            });
          }

        },
        controller: ['$scope', function($scope) {
            $scope.hidden = true;
            $scope.backToTop = function(){
                //console.log("Clicked!");
                $scope.scrollToTop();
            }
        }]
    }
}]);

angular.module('sy.templates.mainleft',['duScroll'])
.directive('mainLeft', ['$document','$window','$timeout', function ($document, $window, $timeout){
    return {
        restrict: 'C',
        link: function ($scope, element, attrs){
            console.log("main left");
            var width = element[0].offsetWidth;
            var top = 400;
            var duration = 2000; //milliseconds
            
            var wind = angular.element($document[0].querySelector('.sy-app'));
            //console.log(wind[0]);
            //Scroll to the exact position
            
            angular.element(wind).bind("scroll", function() {
                var lockTop = angular.element($document[0].querySelector('.top-nav-container'));
                var scrollTop = wind.scrollTop();
                var offset = scrollTop - 108;
                //console.log(offset);
                //console.log(lockTop[0].offsetHeight);

                if(scrollTop > 108){
                    //console.log('lock');
                    element.css(
                       'margin-top', offset+'px'
                    );
                }else{
                    //console.log('unlocked');
                    element.css(
                        'margin-top', 0+'px'
                    );
                    
                }

            });
            /*
            $document.scrollTop(top, duration).then(function() {
              console.log('You just scrolled to the top!');
            });
            */
        }
    }
}]);


angular.module('sy.templates.userimage', [])
.directive('generateImage', [function(){
    return {
        restrict: 'C',
        link: function (scope, element, attrs){
            
            var possible = ['creator','creator-full','developer', 'developer-full','designer', 'designer-full'];
            //console.log("signature: "+attrs.signature);
            var signature = isNaN(attrs.signature) ? attrs.signature : new Date().getTime();
            
            var rand = parseInt(attrs.signature) / Math.pow(10, attrs.signature.length);
            var random  =  parseInt(attrs.signature) % 5;
            console.log(random);
            var num = Math.floor(rand * possible.length) + 1 + random;
            //console.log(parseInt(attrs.signature));
            
            //console.log(num);

            
            //console.log(possible[Math.floor(Math.random() * possible.length)]);
            var w = element[0].offsetWidth;
            var h = element[0].offsetHeight;
            var svg = d3.select(element[0]).append("svg:svg")
                .attr("width", w)
                .attr("height", h);

            var line = d3.svg.line()
            .x(function(d) {
              return d.x;
            })
            .y(function(d) {
              return d.y;
            })
            function getClass(){
                return possible[num];
            }
            function circle(g, cx, cy, r) {
              g.append("circle")
              .attr({
                cx: cx,
                cy: cy,
                r: r,
                class: getClass()
              })
            }

            function tri(g, theta0, cx, cy, r) {
              var theta = -Math.PI/2 + theta0;
              var top = {
                x: r * Math.cos(theta) + cx,
                y: r * Math.sin(theta) + cy
              }
              theta = -Math.PI - Math.PI/6 + theta0
              var left = {
                x: r * Math.cos(theta) + cx,
                y: r * Math.sin(theta) + cy
              }
              theta = Math.PI/6 + theta0
              var right = {
                x: r * Math.cos(theta) + cx,
                y: r * Math.sin(theta) + cy
              }
              g.append("path")
              .attr({
                "d" : line([top, left, right, top]),
                class: getClass()  
              })
            }

            function circleTri(g, cx, cy, r) {
              //we want to draw a circle with an equilateral triangle inside of it
              //many times
              circle(g, cx, cy, r)
              //draw the triangle
              //top point
              tri(g, 0, cx, cy, r)
              tri(g, Math.PI, cx, cy, r)
            }

            var radius = w/2;
            var cx = (w-2)/2;
            var cy = (h-2)/2;

            circle(svg, cx, cy, radius);
            tri(svg, 0, cx, cy, radius)
            tri(svg, Math.PI, cx, cy, radius)

            circle(svg, cx, cy, radius/2)
            tri(svg, Math.PI, cx, cy, radius/2)

            //lets make 6 circles with half the radius centered at 6 points
            //around the big circle
            for(var i = 0; i < num; i++) {
              var theta = i * Math.PI / 3 + Math.PI/6;
              var r = radius / 2;
              var lcx = r * Math.cos(theta) + cx;
              var lcy = r * Math.sin(theta) + cy;
              circle(svg, lcx, lcy, r)
              //if(i % 2 == 0) {
                tri(svg, Math.PI, lcx, lcy, r);
              //} else {
                //tri(svg, 0, lcx, lcy, r);
              //}
              
            }

        }
    }
}]);

/*
angular.module('sy.templates.userimage', [])
.directive('generateImage', [function(){
    return {
        restrict: 'C',
        link: function (scope, element, attrs){
            
            //console.log("signature: "+attrs.signature);
            var w = element[0].offsetWidth;
            var h = element[0].offsetHeight;
            var svg = d3.select(element[0]).append("svg:svg")
                .attr("width", w)
                .attr("height", h);

            var line = d3.svg.line()
            .x(function(d) {
              return d.x;
            })
            .y(function(d) {
              return d.y;
            })

            function circle(g, cx, cy, r) {
              g.append("circle")
              .attr({
                cx: cx,
                cy: cy,
                r: r,
                class: 'creator'
              })
            }
            function tri(g, theta0, cx, cy, r) {
              var theta = -Math.PI/2 + theta0;
              var top = {
                x: r * Math.cos(theta) + cx,
                y: r * Math.sin(theta) + cy
              }
              theta = -Math.PI - Math.PI/6 + theta0
              var left = {
                x: r * Math.cos(theta) + cx,
                y: r * Math.sin(theta) + cy
              }
              theta = Math.PI/6 + theta0
              var right = {
                x: r * Math.cos(theta) + cx,
                y: r * Math.sin(theta) + cy
              }
              g.append("path")
              .attr("d", line([top, left, right, top]))
            }
            function circleTri(g, cx, cy, r) {
              //we want to draw a circle with an equilateral triangle inside of it
              //many times
              circle(g, cx, cy, r)
              //draw the triangle
              //top point
              tri(g, 0, cx, cy, r)
              tri(g, Math.PI, cx, cy, r)
            }

            var radius = w/2;
            var cx = (w-2)/2;
            var cy = (h-2)/2;

            circle(svg, cx, cy, radius);
            tri(svg, 0, cx, cy, radius)
            tri(svg, Math.PI, cx, cy, radius)

            circle(svg, cx, cy, radius/2)
            tri(svg, Math.PI, cx, cy, radius/2)

            //lets make 6 circles with half the radius centered at 6 points
            //around the big circle
            for(var i = 0; i < 6; i++) {
              var theta = i * Math.PI / 3 + Math.PI/6;
              var r = radius / 2;
              var lcx = r * Math.cos(theta) + cx;
              var lcy = r * Math.sin(theta) + cy;
              circle(svg, lcx, lcy, r)
              if(i % 2 == 0) {
                tri(svg, Math.PI, lcx, lcy, r);
              } else {
                tri(svg, 0, lcx, lcy, r);
              }
              
            }

        }
    }
}]);
*/
/*
angular.module('sy.templates.userimage', [])
.directive('generateImage', [function(){
    return {
        restrict: 'C',
        scope: {
            value: '=',
            type: '@'
        },
        link: function (scope, element, attrs){
            //console.log("signature: "+attrs.signature);
            console.log(attrs.signature);
            var rand = Math.floor(attrs.signature * 10) + 1;

            var w = element[0].offsetWidth;
            var h = element[0].offsetHeight;
            var red = "#C74D3D";
            var blue = "#3D8BC7";
            var green = "#3C948B";

            var mouse = [ w / 2 , h / 2],
                count = 0,
                color = d3.scale
                        .linear()
                        .domain([0, 3])
                        .range([red, blue, green]);

            var svg = d3.select(element[0]).append("svg")
                .attr("width", w)
                .attr("height", h);

            var g = svg.selectAll("g")
                .data(d3.range(25))
                .enter()
                .append("g")
                .attr("transform", "translate(" + mouse + ")");

            g.append("rect")
                .attr("rx", 6)
                .attr("ry", 6)
                .attr("x", -12.5)
                .attr("y", -12.5)
                .attr("width", 25)
                .attr("height", 25)
                .attr("transform", function(d, i) { return "scale(" + (1 - d / 25) * 20 + ")"; })
                .style("fill", function(d, i) { return color(i % rand); });
                //.style("fill", d3.scale.category20c());

            g.datum(function(d) {
              return {center: [0, 0], angle: 0};
            });

            svg.on("mousemove", function() {
              mouse = d3.mouse(this);
            });

        }
    }
}]);
*/

angular.module('sy.templates.activity', [])
.directive('profileActivityContent', ['$window', function ($window) {
     return {
        restrict: 'C',
        link: function ($scope, element, attrs){

            
            var margin = {top: 5.5, right: 0, bottom: 5.5, left: 19.5},
            width = element[0].offsetWidth - margin.left - margin.right,
            height = element[0].offsetHeight - margin.top - margin.bottom,
            cellSize = height / 7;

            //var width = element[0].offsetWidth - 25,
            //height = element[0].offsetHeight,
            //height = 200,
            //cellSize = 17; // cell size

        var day = d3.time.format("%w"),
            week = d3.time.format("%U"),
            percent = d3.format(".1%"),
            format = d3.time.format("%Y-%m-%d");

        var color = d3.scale.quantize()
            .domain([-.05, .05])
            .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

        var svg = d3.select(element[0]).selectAll("svg")
            .data(d3.range(2014, 2015))
          .enter()
            .append("svg")
            //.attr("width", width)
            //.attr("height", height)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

            .attr("class", "RdYlGn")
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //.attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

        svg.append("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .style("text-anchor", "middle")
            .text(function(d) { return d; });

        var rect = svg.selectAll(".day")
            .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
          .enter().append("rect")
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) { return week(d) * cellSize; })
            .attr("y", function(d) { return day(d) * cellSize; })
            .datum(format);

        rect.append("title")
            .text(function(d) { return d; });

        svg.selectAll(".month")
            .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
          .enter().append("path")
            .attr("class", "month")
            .attr("d", monthPath);

        /*
        d3.csv("dji.csv", function(error, csv) {
          var data = d3.nest()
            .key(function(d) { return d.Date; })
            .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
            .map(csv);

          rect.filter(function(d) { return d in data; })
              .attr("class", function(d) { return "day " + color(data[d]); })
            .select("title")
              .text(function(d) { return d + ": " + percent(data[d]); });
        });
        */

        function monthPath(t0) {
          var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
              d0 = +day(t0), w0 = +week(t0),
              d1 = +day(t1), w1 = +week(t1);
          return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
              + "H" + w0 * cellSize + "V" + 7 * cellSize
              + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
              + "H" + (w1 + 1) * cellSize + "V" + 0
              + "H" + (w0 + 1) * cellSize + "Z";
        }

        //d3.select(self.frameElement).style("height", "2910px");
        
        }
    }

}]);

angular.module('sy.templates.homeanimation', [])
.directive('homeAnimation', ['$document','$window','$timeout', function ($document, $window, $timeout) {
        return {
            restrict: 'C',
            link: function ($scope, element, attrs){
                console.log("Home Animation");
                


                function norm() {
                  var res, i;
                  res = 0;
                  for (i = 0; i < 10; i += 1) {
                    res += Math.random()*2-1
                  }
                  return res;
                }

                var w = element[0].offsetWidth,
                    h = $window.innerHeight - 6;

                var adjacencyList = [
                  {cx: w, cy: h, r: 5},
                        { cx:488.7, cy:101.6, r:37},
                        { cx:531, cy:62, r:15.7},
                        { cx:490, cy:159, r:15.7},
                        { cx:287.7, cy:50.6, r:37},
                        { cx:81.7, cy:220.6, r:79},
                        { cx:67.7, cy:703.6, r:64},
                        { cx:449.7, cy:526.6, r:53},
                        { cx:696.7, cy:1069.6, r:41},
                        { cx:1390.7, cy:659.6, r:55},
                        { cx:286, cy:109, r:15.7},
                        { cx:64.8, cy:324.2, r:20},
                        { cx:345.8, cy:472.2, r:20},
                        { cx:493.8, cy:458.2, r:20},
                        { cx:335.8, cy:761.2, r:20},
                        { cx:404.3, cy:101.7, r:42},
                        { cx:240.3, cy:338.7, r:42},
                        { cx:431.3, cy:708.7, r:42},
                        { cx:453, cy:44.5, r:24.7},
                        { cx:175, cy:369.5, r:24.7},
                        { cx:273, cy:403.5, r:24.7},
                        { cx:459, cy:411.5, r:19.1},
                        { cx:452.3, cy:451.7, r:16.3},
                        { cx:320.5, cy:359, r:35.2},
                        { cx:332, cy:104.5, r:24.7},
                        { cx:241, cy:100.5, r:24.7},
                        { cx:324, cy:425.5, r:24.7},
                        { cx:411, cy:393.5, r:24.7},
                        { cx:153.8, cy:126.2, r:34},
                        { cx:162.8, cy:307.2, r:34},
                        { cx:87.8, cy:94.2, r:34},
                        { cx:497.8, cy:659.5, r:34.7},
                        { cx:1397.8, cy:755.5, r:34.7},
                        { cx:1488, cy:744.8, r:27.9},
                        { cx:1484.8, cy:675.5, r:34.7},
                        { cx:430.5, cy:626.9, r:34.7},
                        { cx:459.5, cy:147.5, r:12.7},
                        { cx:317.5, cy:10.5, r:8.2},
                        { cx:287.5, cy:5.5, r:4.2},
                        { cx:300.5, cy:6.5, r:4.2},
                        { cx:274.5, cy:6.5, r:4.2},
                        { cx:498.8, cy:48.2, r:12},
                        { cx:1124.7, cy:578.6, r:37},
                        { cx:1039.7, cy:614.6, r:29},
                        { cx:1167, cy:539, r:15.7},
                        { cx:1126, cy:636, r:15.7},
                        { cx:1066.3, cy:570.7, r:17.5},
                        { cx:1095.5, cy:624.5, r:12.7},
                        { cx:1134.8, cy:525.2, r:12},
                        { cx:1130.8, cy:497.2, r:12},
                        { cx:1115.8, cy:473.2, r:10.3},
                        { cx:1068.8, cy:462.2, r:10.3},
                        { cx:1156.8, cy:509.2, r:9.7},
                        { cx:1032.8, cy:571.2, r:9.7},
                        { cx:1039.8, cy:547.2, r:9.7},
                        { cx:1181.8, cy:510.2, r:10.7},
                        { cx:235.8, cy:62.2, r:9.5},
                        { cx:160.8, cy:53.2, r:9.5},
                        { cx:201, cy:109, r:10.2},
                        { cx:169, cy:257, r:10.2},
                        { cx:482.5, cy:608.5, r:13.7},
                        { cx:394.3, cy:663.7, r:11.5},
                        { cx:286.3, cy:681.7, r:11.5},
                        { cx:197.3, cy:677.7, r:8},
                        { cx:374.3, cy:763.7, r:11.5},
                        { cx:115.3, cy:768.7, r:11.5},
                        { cx:180.3, cy:722.7, r:9},
                        { cx:489.3, cy:709.7, r:11.5},
                        { cx:540.3, cy:631.7, r:11.5},
                        { cx:486.3, cy:581.7, r:9},
                        { cx:544.3, cy:580.7, r:11.5},
                        { cx:545.3, cy:514.7, r:11.5},
                        { cx:516.3, cy:524.7, r:9.5},
                        { cx:528.3, cy:462.7, r:9.5},
                        { cx:536.3, cy:540.7, r:11.5},
                        { cx:35, cy:304, r:10.2},
                        { cx:156, cy:77, r:10.2},
                        { cx:215.8, cy:126.2, r:6.5},
                        { cx:133.8, cy:84.2, r:6.8},
                        { cx:108.8, cy:134.2, r:6.8},
                        { cx:157.8, cy:171.2, r:6.8},
                        { cx:18.8, cy:152.2, r:6.8},
                        { cx:150.6, cy:32.4, r:8.7},
                        { cx:198.8, cy:132.2, r:6.5},
                        { cx:41.8, cy:99.2, r:6.5},
                        { cx:100.8, cy:50.2, r:6.5},
                        { cx:188.8, cy:269.2, r:6.5},
                        { cx:235.8, cy:392.2, r:6.5},
                        { cx:386.8, cy:513.2, r:6.5},
                        { cx:395.8, cy:490.2, r:6.5},
                        { cx:474.8, cy:435.2, r:4.5},
                        { cx:510.8, cy:433.2, r:4.5},
                        { cx:520.8, cy:445.2, r:4.5},
                        { cx:292.8, cy:321.2, r:6.5},
                        { cx:91, cy:349, r:10.2},
                        { cx:257, cy:442, r:10.2},
                        { cx:374, cy:494, r:10.2},
                        { cx:427, cy:431, r:10.2},
                        { cx:418, cy:462, r:12.2},
                        { cx:492, cy:422, r:10.2},
                        { cx:311, cy:465, r:10.2},
                        { cx:210.3, cy:388.7, r:10.5},
                        { cx:386, cy:466, r:14.2},
                        { cx:286.3, cy:449.7, r:13.8},
                        { cx:398.3, cy:434.7, r:13.8},
                        { cx:210, cy:287, r:11.7},
                        { cx:140.7, cy:391.6, r:10.9},
                        { cx:70.3, cy:354.7, r:6},
                        { cx:96.3, cy:370.7, r:7.3},
                        { cx:162.3, cy:404.7, r:7.3},
                        { cx:413.6, cy:582, r:7.7},
                        { cx:385.8, cy:640.2, r:6.5},
                        { cx:191.8, cy:701.2, r:5},
                        { cx:313.8, cy:783.2, r:5},
                        { cx:258.8, cy:788.2, r:5},
                        { cx:373.8, cy:677.2, r:7.2},
                        { cx:382.8, cy:741.2, r:6.5},
                        { cx:658.8, cy:988.2, r:4.5},
                        { cx:658.8, cy:1035.2, r:4.5},
                        { cx:688.8, cy:992.2, r:4.5},
                        { cx:728.8, cy:1029.2, r:4.5},
                        { cx:400.8, cy:757.2, r:10.5},
                        { cx:353.3, cy:673.7, r:7.2},
                        { cx:367.8, cy:655.2, r:10.5},
                        { cx:325.8, cy:679.2, r:15},
                        { cx:552.8, cy:556.2, r:6.5},
                        { cx:545.8, cy:493.2, r:5.2},
                        { cx:460.8, cy:591.2, r:6.5},
                        { cx:549, cy:607, r:6.7},
                        { cx:657, cy:1103, r:6.7},
                        { cx:352.8, cy:56.2, r:22.5},
                        { cx:239.2, cy:710.1, r:38.5},
                        { cx:238, cy:774, r:15.7},
                        { cx:148, cy:768, r:15.7},
                        { cx:147, cy:732, r:15.7},
                        { cx:284, cy:764.5, r:24.7},
                        { cx:193, cy:760.5, r:24.7},
                        { cx:160, cy:687.5, r:24.7},
                        { cx:304.8, cy:716.2, r:22.5},
                        { cx:358, cy:712, r:25.7},
                        { cx:848.1, cy:1076.7, r:23.2},
                        { cx:822.5, cy:1102.3, r:5.8},
                        { cx:895.6, cy:987.2, r:4.9},
                        { cx:948.3, cy:1038.9, r:5.5},
                        { cx:748.5, cy:1077.3, r:5.8},
                        { cx:868.4, cy:975.2, r:8.4},
                        { cx:768.4, cy:1004.2, r:17.4},
                        { cx:739.4, cy:1014.2, r:8.4},
                        { cx:738.4, cy:994.2, r:6.4},
                        { cx:800.4, cy:987.2, r:8.4},
                        { cx:836.5, cy:981.6, r:17.4},
                        { cx:788, cy:1080.5, r:28.7},
                        { cx:812.1, cy:1024.5, r:26.1},
                        { cx:873.9, cy:1019.6, r:29.9},
                        { cx:196, cy:68.5, r:24.7},
                        { cx:129, cy:55.5, r:17.4},
                        { cx:40, cy:128.5, r:17.4},
                        { cx:108, cy:320.5, r:17.4},
                        { cx:364, cy:399.5, r:17.4},
                        { cx:518, cy:493.5, r:17.4},
                        { cx:126.4, cy:358.8, r:19.7},
                        { cx:376.1, cy:363, r:15.5},
                        { cx:225.4, cy:421.8, r:19.7},
                        { cx:747.3, cy:134.7, r:42},
                        { cx:780, cy:199.5, r:24.7},
                        { cx:818, cy:157.5, r:24.7},
                        { cx:742.8, cy:188.2, r:6.5},
                        { cx:698.8, cy:173.2, r:6.5},
                        { cx:764, cy:238, r:10.2},
                        { cx:848, cy:189, r:10.2},
                        { cx:673, cy:102, r:10.2},
                        { cx:717.3, cy:184.7, r:10.5},
                        { cx:693.3, cy:150.7, r:10.5},
                        { cx:690.3, cy:121.7, r:10.5},
                        { cx:809.6, cy:107, r:20.8},
                        { cx:793.3, cy:245.7, r:13.8},
                        { cx:729.3, cy:76.7, r:13.8},
                        { cx:823.3, cy:208.7, r:13.8},
                        { cx:700.3, cy:92.7, r:13.8},
                        { cx:732.4, cy:217.8, r:19.7},
                        { cx:926.4, cy:921.1, r:34.4},
                        { cx:938, cy:832.8, r:24.7},
                        { cx:1027, cy:836.8, r:34.6},
                        { cx:922.1, cy:870.6, r:10.9},
                        { cx:901.2, cy:881.2, r:6.9},
                        { cx:880.2, cy:919.2, r:6.9},
                        { cx:929.2, cy:799.6, r:4.4},
                        { cx:980.1, cy:796.9, r:10.2},
                        { cx:977.1, cy:823.9, r:10.2},
                        { cx:998.3, cy:878.7, r:10.5},
                        { cx:980.3, cy:846.7, r:6.7},
                        { cx:1045.3, cy:880.7, r:6.7},
                        { cx:951.3, cy:791.2, r:13.8},
                        { cx:962.2, cy:874.4, r:19.7},
                        { cx:188.4, cy:410.8, r:13.7},
                        { cx:366.4, cy:436.8, r:13.7},
                        { cx:870.5, cy:502, r:35.2},
                        { cx:874, cy:568.5, r:24.7},
                        { cx:958, cy:537.5, r:21.2},
                        { cx:978, cy:570, r:10.2},
                        { cx:948.3, cy:577.7, r:13.8},
                        { cx:896.3, cy:601.7, r:10.2},
                        { cx:914, cy:542.5, r:17.4},
                        { cx:926.1, cy:506, r:15.5},
                        { cx:946.1, cy:476, r:15.5},
                        { cx:916.4, cy:579.8, r:13.7},
                        { cx:859, cy:415.5, r:19.1},
                        { cx:911, cy:456.5, r:19.1},
                        { cx:841.3, cy:451.7, r:16.3},
                        { cx:795.5, cy:303, r:35.2},
                        { cx:849.5, cy:254, r:32.2},
                        { cx:799, cy:369.5, r:24.7},
                        { cx:813.5, cy:419, r:21.2},
                        { cx:886, cy:337.5, r:24.7},
                        { cx:825.8, cy:498.2, r:4.5},
                        { cx:911.8, cy:485.2, r:4.5},
                        { cx:935.4, cy:411.6, r:4.1},
                        { cx:845.6, cy:543.4, r:6.7},
                        { cx:858.8, cy:361.2, r:4.5},
                        { cx:786.8, cy:402.2, r:4.5},
                        { cx:914.8, cy:358.2, r:4.5},
                        { cx:755.8, cy:325.2, r:4.5},
                        { cx:772.8, cy:260.2, r:4.5},
                        { cx:845.8, cy:212.2, r:4.5},
                        { cx:812.8, cy:231.2, r:4.5},
                        { cx:902, cy:375, r:10.2},
                        { cx:884, cy:294, r:12.7},
                        { cx:892, cy:426, r:10.2},
                        { cx:875, cy:449, r:12.7},
                        { cx:768, cy:345, r:9.1},
                        { cx:747.8, cy:299.2, r:7.8},
                        { cx:726.8, cy:248.2, r:6.5},
                        { cx:861.8, cy:212.2, r:6.5},
                        { cx:873.3, cy:378.7, r:13.8},
                        { cx:895.3, cy:399.7, r:10.2},
                        { cx:938.3, cy:426.7, r:7.2},
                        { cx:922.3, cy:395.7, r:12.4},
                        { cx:811.3, cy:453.7, r:9.2},
                        { cx:961.3, cy:501.7, r:9.2},
                        { cx:943.3, cy:446.7, r:9.2},
                        { cx:823.3, cy:477.7, r:10.2},
                        { cx:917.3, cy:422.7, r:10.2},
                        { cx:839, cy:343.5, r:17.4},
                        { cx:747, cy:269.5, r:17.4},
                        { cx:690, cy:37, r:10.2},
                        { cx:719.3, cy:44.7, r:13.8},
                        { cx:665.1, cy:27.9, r:11.7},
                        { cx:775.5, cy:53, r:32.2},
                        { cx:698.8, cy:59.2, r:4.5},
                        { cx:652.8, cy:47.2, r:6.5},
                        { cx:707.8, cy:22.2, r:6.5},
                        { cx:738.8, cy:23.2, r:6.5},
                        { cx:637.8, cy:23.2, r:6.5},
                        { cx:673, cy:68.5, r:17.4},
                        { cx:851.1, cy:307, r:15.5},
                        { cx:841.4, cy:380.8, r:13.7},
                        { cx:1029.7, cy:742.6, r:53},
                        { cx:925.8, cy:688.2, r:20},
                        { cx:1073.8, cy:674.2, r:20},
                        { cx:1032.3, cy:667.7, r:16.3},
                        { cx:904, cy:641.5, r:24.7},
                        { cx:963.3, cy:760.7, r:11.5},
                        { cx:937.6, cy:763.3, r:10.1},
                        { cx:1096.3, cy:740.7, r:9.5},
                        { cx:1068.3, cy:802.7, r:13.8},
                        { cx:1108.3, cy:678.7, r:9.5},
                        { cx:1073.3, cy:640.7, r:8.5},
                        { cx:945.3, cy:737.7, r:11.5},
                        { cx:966.8, cy:729.2, r:6.5},
                        { cx:975.8, cy:706.2, r:6.5},
                        { cx:1054.8, cy:651.2, r:4.5},
                        { cx:1090.8, cy:649.2, r:4.5},
                        { cx:1146.8, cy:619.2, r:4.5},
                        { cx:1106.8, cy:656.2, r:7.8},
                        { cx:1079.8, cy:601.2, r:7.8},
                        { cx:954, cy:710, r:10.2},
                        { cx:1007, cy:647, r:10.2},
                        { cx:998, cy:678, r:12.2},
                        { cx:922, cy:724, r:10.2},
                        { cx:966, cy:682, r:14.2},
                        { cx:978.3, cy:650.7, r:13.8},
                        { cx:976.8, cy:777.2, r:5.2},
                        { cx:1001.8, cy:799.2, r:5.2},
                        { cx:1081.8, cy:780.2, r:5.2},
                        { cx:1090.8, cy:762.2, r:5.2},
                        { cx:924.8, cy:744.2, r:5.2},
                        { cx:897.8, cy:676.2, r:5.2},
                        { cx:989.3, cy:621.7, r:11.5},
                        { cx:963.6, cy:624.3, r:10.1},
                        { cx:971.3, cy:598.7, r:11.5},
                        { cx:992.8, cy:600.2, r:5.2},
                        { cx:950.8, cy:605.2, r:5.2},
                        { cx:864.8, cy:601.2, r:5.2},
                        { cx:940.8, cy:627.2, r:7.4},
                        { cx:1127.8, cy:664.2, r:7.4},
                        { cx:876.1, cy:615.5, r:8.1},
                        { cx:1098, cy:709.5, r:17.4},
                        { cx:946.4, cy:652.8, r:13.7},
                        { cx:929.6, cy:606.5, r:11},
                        { cx:519, cy:605.5, r:17.4},
                        { cx:710, cy:1007.5, r:17.4},
                        { cx:754, cy:1042.5, r:17.4},
                        { cx:671, cy:1011.5, r:17.4},
                        { cx:513, cy:566.5, r:17.4},
                        { cx:939.3, cy:993.8, r:34.7},
                        { cx:988.5, cy:981, r:11.5},
                        { cx:1008.5, cy:934, r:11.5},
                        { cx:1023.5, cy:902, r:18},
                        { cx:890.5, cy:1070, r:15.1},
                        { cx:745.5, cy:1103, r:13.7},
                        { cx:1004.6, cy:960.3, r:6.7},
                        { cx:976.7, cy:949.4, r:17.4},
                        { cx:868.2, cy:946.5, r:14.9},
                        { cx:894.7, cy:965.4, r:12.7},
                        { cx:919.7, cy:1046.4, r:17.4},
                        { cx:983.4, cy:910.5, r:17.4},
                        { cx:1348, cy:725.5, r:17.4},
                        { cx:1450, cy:779.5, r:17.4},
                        { cx:1428.7, cy:599.1, r:10.7},
                        { cx:1443, cy:717.5, r:17.4},
                        { cx:1497, cy:627.5, r:9.9},
                        { cx:1518, cy:712.5, r:10.4},
                        { cx:1446, cy:748.5, r:8.9},
                        { cx:1350.4, cy:755.5, r:7.9},
                        { cx:1334.4, cy:697.5, r:7.9},
                        { cx:1461.5, cy:618, r:21.9},
                        { cx:19, cy:635.5, r:14.7},
                        { cx:44, cy:633.5, r:5.4},
                        { cx:8, cy:658.5, r:5.4},
                        { cx:228.8, cy:26.2, r:22.5},
                        { cx:188.8, cy:27.2, r:13.8},
                        { cx:1168.6, cy:460, r:35.8},
                        { cx:1102.8, cy:425.2, r:34},
                        { cx:1080.1, cy:512.5, r:36.7},
                        { cx:1175.8, cy:384.2, r:9.5},
                        { cx:1212.2, cy:438.1, r:7.4},
                        { cx:1171, cy:408, r:10.2},
                        { cx:1104.8, cy:353.2, r:9.5},
                        { cx:1096, cy:376, r:10.2},
                        { cx:1148.8, cy:415.2, r:6.8},
                        { cx:1122.8, cy:365.2, r:6.8},
                        { cx:1105.8, cy:333.2, r:5.5},
                        { cx:1165.6, cy:363.4, r:8.7},
                        { cx:1221.8, cy:361.2, r:9.5},
                        { cx:1212.6, cy:339.4, r:8.7},
                        { cx:1167.6, cy:241.4, r:8.7},
                        { cx:1242.6, cy:363.4, r:6.2},
                        { cx:1115.8, cy:381.2, r:6.5},
                        { cx:1211, cy:399.5, r:24.7},
                        { cx:1256.2, cy:256.6, r:29.9},
                        { cx:1141, cy:332.5, r:24.7},
                        { cx:1144, cy:386.5, r:17.4},
                        { cx:1250, cy:308.5, r:17.4},
                        { cx:1192.8, cy:360.2, r:13.8},
                        { cx:1185.7, cy:326.8, r:15.2},
                        { cx:1238.7, cy:340.8, r:11.7},
                        { cx:1216.7, cy:313.8, r:11.7},
                        { cx:1171.7, cy:266.8, r:11.7},
                        { cx:1142.7, cy:245.8, r:11.7},
                        { cx:1163.7, cy:216.8, r:11.7},
                        { cx:400.5, cy:30, r:24.7},
                        { cx:435.5, cy:145.5, r:6.7},
                        { cx:1285.7, cy:157.6, r:37},
                        { cx:1328, cy:118, r:15.7},
                        { cx:1287, cy:215, r:15.7},
                        { cx:1201.3, cy:157.7, r:42},
                        { cx:1249, cy:102.5, r:24.7},
                        { cx:1203, cy:229.5, r:24.7},
                        { cx:1332, cy:72.5, r:24.7},
                        { cx:1256.5, cy:203.5, r:12.7},
                        { cx:1204.6, cy:278.3, r:18.1},
                        { cx:1173.5, cy:296.5, r:12.7},
                        { cx:1137.2, cy:283.1, r:20.1},
                        { cx:1295.8, cy:104.2, r:12},
                        { cx:1196.8, cy:96.2, r:14.3},
                        { cx:1206.8, cy:65.2, r:13.3},
                        { cx:1271.8, cy:33.2, r:12},
                        { cx:1297.8, cy:41.2, r:12},
                        { cx:1324.8, cy:31.2, r:12},
                        { cx:1232.5, cy:201.5, r:6.7},
                        { cx:1156.9, cy:191.8, r:8.4},
                        { cx:1246.5, cy:183.5, r:4.7},
                        { cx:1143.5, cy:224.5, r:4.7},
                        { cx:1237.5, cy:220.5, r:4.7},
                        { cx:1291.5, cy:239.5, r:4.7},
                        { cx:1271.5, cy:292.5, r:4.7},
                        { cx:1230.5, cy:289.5, r:4.7},
                        { cx:1115.5, cy:306.5, r:4.7},
                        { cx:1237.5, cy:377.5, r:4.7},
                        { cx:1286, cy:72, r:15.7},
                        { cx:1221, cy:34, r:15.7},
                        { cx:1357, cy:33, r:15.7},
                        { cx:1255.5, cy:58.5, r:12.7},
                        { cx:1231.5, cy:59.5, r:6.7},
                        { cx:1219.5, cy:85.5, r:4.1},
                        { cx:1248.5, cy:34.5, r:6.7},
                        { cx:259.5, cy:9.5, r:6.7},
                        { cx:358.5, cy:127.5, r:5.4},
                        { cx:332.5, cy:25.5, r:8.2},
                        { cx:359, cy:15, r:13.7},

                ];

                var nodes = d3.values(adjacencyList)
                .map(function(list) { 
                    var true_y = (norm()*50)+250;
                    //console.log(list);
                    return {
                        radius: list.r / 3, 
                        x: true_y,
                        y: true_y,
                        true_x: (w -100 / 2 + list.cx) / 3,
                        true_y: (h / 2 + list.cy) / 3 
                    }
                });

                var force = d3.layout.force()
                    .gravity(0.06)
                    .charge(function(d, i) { return i ? 0 : -2000; })
                    .friction(0.95)
                    .nodes(nodes)
                    .size([w, h]);

                var root = nodes[0];
                root.radius = 0;
                root.fixed = true;

                force.start();

                var svg = d3.select(element[0]).append("svg:svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.selectAll("circle")
                    .data(nodes)
                  .enter().append("svg:circle")
                    .attr("r", function(d) { return d.radius ; })
                    .style("fill", '#3b948b')
                    //.style("stroke", "black");

                


                force.on("tick", function(e) {
                  var q,
                    node,
                    i = 0,
                    n = nodes.length;
                    
                  var q = d3.geom.quadtree(nodes);

                  while (++i < n) {
                    node = nodes[i];
                    q.visit(collide(node));
                    xerr = node.x - node.true_x;
                    yerr = node.y - node.true_y;
                    node.x -= xerr*0.05;
                    node.y -= yerr*0.05;
                  }
                  
                svg.on("mousemove", function() {
                  var p1 = d3.mouse(this);
                  root.px = p1[0];
                  root.py = p1[1];
                  force.resume();
                });

                svg.selectAll("circle")
                      .attr("cx", function(d) { return d.x; })
                      .attr("cy", function(d) { return d.y; });
                });

                function collide(node) {
                  var r = node.radius,
                    nx1,
                    nx2,
                    ny1,
                    ny2,
                    xerr,
                    yerr;
                    
                  nx1 = node.x - r;
                  nx2 = node.x + r;
                  ny1 = node.y - r;
                  ny2 = node.y + r;
                      
                  return function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== node)) {
                      var x = node.x - quad.point.x,
                          y = node.y - quad.point.y,
                          l = Math.sqrt(x * x + y * y),
                          r = node.radius + quad.point.radius;
                      if (l < r) {
                        // we're colliding.
                        var xnudge, ynudge, nudge_factor;
                        nudge_factor = (l - r) / l * .4;
                        xnudge = x*nudge_factor;
                        ynudge = y*nudge_factor;
                        node.x -= xnudge;
                        node.y -= ynudge;
                        quad.point.x += xnudge;
                        quad.point.y += ynudge;
                      }
                    }
                    return x1 > nx2
                        || x2 < nx1
                        || y1 > ny2
                        || y2 < ny1;
                  };
                }
                    
            }
        }
}]);

angular.module('sy.symantis.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('sy.symantis.modal', ['sy.symantis.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $symodal service. It creates a backdrop element.
 */
  .directive('symodalBlur', ['$symodalStack', '$timeout', function ($symodalStack, $timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope) {

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });

        scope.close = function (evt) {
          var modal = $symodalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $symodalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('symodalWindow', ['$symodalStack', '$timeout', function ($symodalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: 'template/modal/window.html',
      link: function (scope, element, attrs) {
        scope.windowClass = attrs.windowClass || '';

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;
          // focus a freshly-opened modal
          element[0].focus();
        });
      }
    };
  }])

  .factory('$symodalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $symodalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var symodalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(symodalWindow.modalDomEl, symodalWindow.modalScope, 300, checkRemoveBackdrop);
        body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating, 0);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            $rootScope.$apply(function () {
              $symodalStack.dismiss(modal.key);
            });
          }
        }
      });

      $symodalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });
        //var body = angular.element($document[0].querySelector('sitenav-push'))
        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        
        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          backdropDomEl = $compile('<div symodal-blur></div>')(backdropScope);
          body.append(backdropDomEl);
        }
        
          
        var angularDomEl = angular.element('<div symodal-window></div>');
        angularDomEl.attr('window-class', modal.windowClass);
        angularDomEl.attr('index', openedWindows.length() - 1);
        angularDomEl.attr('animate', 'animate');
        angularDomEl.html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      $symodalStack.close = function (modalInstance, result) {
        var symodalWindow = openedWindows.get(modalInstance).value;
        if (symodalWindow) {
          symodalWindow.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $symodalStack.dismiss = function (modalInstance, reason) {
        var symodalWindow = openedWindows.get(modalInstance).value;
        if (symodalWindow) {
          symodalWindow.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $symodalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $symodalStack.getTop = function () {
        return openedWindows.top();
      };

      return $symodalStack;
    }])

  .provider('$symodal', function () {

    var $symodalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$symodalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $symodalStack) {

          var $symodal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value, key) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $symodal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $symodalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $symodalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $symodalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
              }

              $symodalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                windowClass: modalOptions.windowClass
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $symodal;
        }]
    };

    return $symodalProvider;
  });

angular.module('sy.templates.timeline', [])
.directive('timelineJs',  function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            
            var width = element[0].offsetWidth;

            var data = {
                    "timeline":
                    {
                        "headline":"Symantis Roadmap",
                        "type":"default",
                        "text":"<p>Where we are, where we are going.</p>",
                       // "asset": {
                           // "media":"http://yourdomain_or_socialmedialink_goes_here.jpg",
                           // "credit":"Credit Name Goes Here",
                           // "caption":"Caption text goes here"
                       // },
                        "date": [
                            {
                                "startDate":"2012,12,10",
                                "endDate":"2012,12,31",
                                "headline":"Initial Idea",
                                "text":"<p>We need something that let's us build faster.</p>",
                                "tag":"Initial Idea",
                                //"classname":"optionaluniqueclassnamecanbeaddedhere",
                                //"asset": {
                                  //  "media":"http://twitter.com/ArjunaSoriano/status/164181156147900416",
                                    //"thumbnail":"optional-32x32px.jpg",
                                    //"credit":"Credit Name Goes Here",
                                    //"caption":"Caption text goes here"
                                //}
                            },
                            {
                                "startDate":"2012,12,10",
                                "endDate":"2012,12,31",
                                "headline":"Symantis is Born",
                                "text":"<p>Initial ground work for a symbiotic system is created.</p>",
                                "tag":"Symantis",
                            }
                        ],
                        "era": [
                            {
                                "startDate":"2012,12,10",
                                "endDate":"2013,12,11",
                                "headline":"Incpetion",
                                "text":"<p>Symantis is planned on a whiteboard</p>",
                                "tag":"Incpetion"
                            },
                            {
                                "startDate":"2013,12,12",
                                "endDate":"2014,12,11",
                                "headline":"University Development",
                                "text":"<p>Symantis gains new members</p>",
                                "tag":"Initial Development"
                            }

                        ]
                    }
                }

            postpone = $timeout(function() {
                createStoryJS({
                    type:       'timeline',
                    width:      '100%',
                    height:     '600',
                    source:     data,
                    hash_bookmark:      true,
                    embed_id:   'sy-timeline',
                    //css:        'lib/timelinejs/css/timeline.css',
                    //js:         'lib/timelinejs/js/timeline.js'
                });
            }, 0);
            console.log("Running timelineJS");
        }
    }
});
angular.module('sy.masonry', ['ng'])
.directive('masonry', function($parse) {
    return {
        restrict: 'AC',
        scope : true,
        link: function(scope, elem, attrs) {
            scope.items = [];
            var container = elem[0];
            var options = angular.extend({
                itemSelector: '.item'
            }, JSON.parse(attrs.masonry));

            var masonry = scope.masonry = new Masonry(container, options);

            var debounceTimeout = 0;
            scope.update = function() {
                if (debounceTimeout) {
                    window.clearTimeout(debounceTimeout);
                }
                debounceTimeout = window.setTimeout(function() {
                    debounceTimeout = 0;

                    masonry.reloadItems();
                    masonry.layout();

                    elem.children(options.itemSelector).css('visibility', 'visible');
                }, 150);
            };
            scope.removedTile = function (id, element) {
                if (typeof (scope.remove) == 'function') {
                    scope.remove(id);    
                }
                masonry.remove(element[0]);
                masonry.layout();
            }
        },
        controller: ['$scope', function($scope) {

            this.removedTile = function(id, element) {
                $scope.removedTile(id, element);
                //console.log($scope.menuOpen);
            };
        }]
    };
})
.directive('masonryTile', function() {
    return {
        require: '^masonry',
        restrict: 'AC',
        link: function(scope, element, attrs, masonry) {
            element.css('visibility', 'hidden');
            var master = element.parent('*[masonry]:first').scope(),
                update = master.update;

            imagesLoaded( element[0], update);
            element.ready(update);
            
            //console.log(scope.remove());
            //console.log(scope.removeTile);
            scope.removeTile = function(id){
                masonry.removedTile(id, element);
            } 

        },
        controller: ['$scope', function($scope) {
            this.removeTile = function(id) {
                console.log(id);
                $scope.removeTile(id);
                //console.log($scope.menuOpen);
            };
        }]
    };
});

angular.module('sy.hashtagify', [])
.directive('hashtagify', ['$timeout', '$compile',
    function($timeout, $compile) {
        return {
            restrict: 'A',
            scope: {
                uClick: '&userClick',
                tClick: '&termClick'
            },
            link: function(scope, element, attrs) {
                $timeout(function() {
                    var html = element.html();

                    if (html === '') {
                        return false;
                    }

                    if (attrs.userClick) {
                        html = html.replace(/(|\s)*@(\w+)/g, '$1<a ng-click="uClick({$event: $event})" class="hashtag">@$2</a>'); 
                    }
                    
                    if (attrs.termClick) {
                        html = html.replace(/(^|\s)*#(\w+)/g, '$1<a ng-click="tClick({$event: $event})" class="hashtag">#$2</a>');
                    }

                    element.html(html);
                    
                    $compile(element.contents())(scope);
                }, 0);
            }
        };
    }
]);