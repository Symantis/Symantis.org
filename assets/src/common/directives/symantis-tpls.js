angular.module("sy.templates", [
    'sy.templates.sitenav', 
    'sy.templates.homeanimation', 
    'sy.templates.userimage', 
    'sy.templates.mainleft',
    'sy.templates.scroll'
]);

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
                    if(menuOpen != false){
                        menuOpen = false;
                        $timeout.cancel(trytimeout);
                        $scope.$broadcast('trytimeout', { status: 'canceled'});
                        sidebar.removeClass('sy-menu-open blur');
                        $scope.$broadcast('menuOpened', { status: menuOpen});
                    }
                    //console.log($scope.menuOpen);
                };
                $scope.show = function () {
                    if(menuOpen != true){
                        menuOpen = true;
                        $timeout.cancel(trytimeout);
                        $scope.$broadcast('trytimeout', { status: 'canceled'});
                        sidebar.addClass('sy-menu-open blur');
                        $scope.$broadcast('menuOpened', { status: menuOpen});
                    }
                    //console.log($scope.menuOpen);
                };
                $scope.toggle = function () {
					menuOpen = menuOpen == true ? false : true;
                	$timeout.cancel(trytimeout);
                	$scope.$broadcast('trytimeout', { status: 'canceled'});
                	sidebar.toggleClass("sy-menu-open blur");
                	$scope.$broadcast('menuOpened', { status: menuOpen});
                	//console.log($scope.menuOpen);
                }
                
                win.bind("resize.body", $scope.hide);

                $scope.$on('$destroy', function() {
                    win.unbind("resize.body", $scope.hide);
                });


                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    			console.log("state changed");
                    $scope.$broadcast('trytimeout', { status: 'canceled'});
	    			//$scope.hide();
                    sidebar.removeClass('blur');
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
.directive('topNavContainer', ['$document','$window','$state', '$timeout' ,function ($document, $window, $state, $timeout) {
        return {
            require: '^topNav',
            restrict: 'C',
            link: function ($scope, element, attrs, topNav) {
                //console.log(element.$parent());
	            var win = angular.element($window);

	            element.css({ 
			    	width: element.parent()[0].offsetWidth - 50 + 'px' 
			    });

			    win.bind("resize", function(){
			    	element.css({ 
				    	width: element.parent()[0].offsetWidth - 50 + 'px' 
				    });
			    });
                var trytimeout = angular.noop;

			    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    			console.log(fromState);
                    console.log(toState);

                    element.css({ 
				    	width: element.parent()[0].offsetWidth - 50 + 'px' 
				    });
                    var toSplit = toState.name.split('.');
                    var fromSplit = fromState.name.split('.');


                    /*
                    if((toSplit[0] != fromSplit[0])){
                        
                        $timeout.cancel(trytimeout);

                        element.css({ 
                            'margin-top' : - element[0].offsetHeight + 'px' 
                        });

                        trytimeout = $timeout(function(){
                            element.css({ 
                                'margin-top' : 0 + 'px' 
                            }); 
                        }, 1000);
                    }
                    */
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
            
            //element.attr('dropdown-toggle', "#topNavLeftNav");
            console.log(element);
        }
    }
}]);

angular.module('sy.templates.scroll',['duScroll'])
.directive('backToTop', ['$document','$window','$timeout', '$state', function ($document, $window, $timeout, $state){
    return {
        restrict: 'C',
        link: function ($scope, element, attrs){
           var scrollToTopBtn = $scope.scrollToTopBtn = element;
            
           //scrollToTopBtn.addClass('hide');           

          $scope.toggleViewport = function(){
            var viewport = angular.element($document[0].querySelector('.sitenav-push'));
            var win = angular.element($window); 

            var viewportHeight = viewport[0].offsetHeight;
            var winHeight = win[0].innerHeight;

            console.log(viewport[0].offsetHeight);
            console.log(win[0].innerHeight); 

            if(viewportHeight > winHeight){
                console.log("Show");
                scrollToTopBtn.addClass('hide');
            }else{
                console.log("Hide");
                scrollToTopBtn.removeClass('hide');
            }
          } 

          $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            
            $scope.toggleViewport();

          });
          $scope.scrollToTop = function(){
            var top = 0;
            var duration = 1000; //milliseconds
            var viewport = angular.element($document[0].querySelector('.sitenav-push'));
            //Scroll to the exact position
            viewport.scrollTop(top, duration).then(function() {
              console.log('You just scrolled to the top!');
            });
          }

        },
        controller: ['$scope', function($scope) {
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
            
            var wind = angular.element($document[0].querySelector('.sitenav-push'));
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
                    element.css('margin-top' , offset+'px');
                }else{
                    //console.log('unlocked');
                    element.css('margin-top' , 0+'px');
                    
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
        scope: {
            value: '=',
            type: '@'
        },
        link: function (scope, element, attrs){
            console.log("signature: "+attrs.signature);
            
            var rand = Math.floor(attrs.signature * 10) + 1;

            var w = element[0].offsetWidth;
            var h = element[0].offsetHeight;

            var mouse = [ w / 2 , h / 2],
                count = 0,
                color = d3.scale
                        .linear()
                        .domain([0, 7])
                        .range(["red", "green", "blue", "orange", "yellow", "pink", "gold"]);

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

            /*
            d3.timer(function() {
              count++;
              g.attr("transform", function(d, i) {
                d.center[0] += (mouse[0] - d.center[0]) / (i + 5);
                d.center[1] += (mouse[1] - d.center[1]) / (i + 5);
                d.angle += Math.sin((count + i) / 10) * 7;
                return "translate(" + d.center + ")rotate(" + d.angle + ")";
              });
            });
            */

        }
    }
}]);

angular.module('sy.templates.homeanimation', [])
.directive('homeAnimation', ['$document','$window','$timeout', function ($document, $window, $timeout) {
        return {
            restrict: 'C',
            link: function ($scope, element, attrs){
                console.log("Home Animation");
                
                

                var w = element[0].offsetWidth,
                    h = $window.innerHeight - 6;

                var nodes = d3.range(250).map(function() { return {radius: Math.random() * 12 + 4}; }),
                    links = d3.layout.tree().links(nodes),
                    color = d3.scale
                            .linear()
                            .domain([1,3])
                            .range(["#3b948b", "#3b948b", "#3b948b"]);

                var force = d3.layout.force()
                    .gravity(0.06)
                    .charge(function(d, i) { return i ? 0 : -2000; })
                    .nodes(nodes)
                    .links(links)
                    .size([w, h]);

                var root = nodes[0];
                root.radius = 0;
                root.fixed = true;

                force.start();

                var svg = d3.select(element[0]).append("svg:svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.selectAll("circle")
                    .data(nodes.slice(1))
                    .enter()
                    .append("svg:circle")
                    .attr("r", function(d) { return d.radius - 2; })
                    .style("fill", function(d, i) { return color(i % 3); });

                svg.selectAll("line.link")
                    .data(links, function(d) { return d.target.id; })
                    .enter()
                    .insert("svg:line", ".node")
                    .attr("class", "cirlcelink")
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                force.on("tick", function(e) {
                  var q = d3.geom.quadtree(nodes),
                      i = 0,
                      n = nodes.length;

                  while (++i < n) {
                    q.visit(collide(nodes[i]));
                  }
                  

                  svg.selectAll("circle")
                      .attr("cx", function(d) { return d.x; })
                      .attr("cy", function(d) { return d.y; });
                  
                  svg.selectAll("line.link")   
                      .attr("x1", function(d) { return d.source.x; })
                      .attr("y1", function(d) { return d.source.y; })
                      .attr("x2", function(d) { return d.target.x; })
                      .attr("y2", function(d) { return d.target.y; });  
                    
                });

                svg.on("mousemove", function() {
                  var p1 = d3.mouse(this);
                  root.px = p1[0];
                  root.py = p1[1];
                  force.resume();
                });

                function collide(node) {
                  var r = node.radius + 16,
                      nx1 = node.x - r,
                      nx2 = node.x + r,
                      ny1 = node.y - r,
                      ny2 = node.y + r;
                  return function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== node)) {
                      var x = node.x - quad.point.x,
                          y = node.y - quad.point.y,
                          l = Math.sqrt(x * x + y * y),
                          r = node.radius + quad.point.radius;
                      if (l < r) {
                        l = (l - r) / l * .5;
                        node.x -= x *= l;
                        node.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                      }
                    }
                    return x1 > nx2
                        || x2 < nx1
                        || y1 > ny2
                        || y2 < ny1;
                  };
                }

                function stepOne(){

                }
            }
        }
}]);