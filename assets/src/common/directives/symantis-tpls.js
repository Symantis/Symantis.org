angular.module("sy.templates", ['sy.templates.sitenav']);

/*
 * sySiteNavToggle - Provides site nav menu functionality
 * @restrict class or attribute
 * @example:

 */
angular.module('sy.templates.sitenav', [])
.directive('syNav', ['$document', '$window', '$location', '$state', '$timeout', function ($document, $window, $location, $state, $timeout) {
	 return {
            scope: {},
            restrict: 'C',
            link: function ($scope, element, attrs) {
                var win = angular.element($window);
                var sidebar = $scope.sidebar = element;
                $scope.trytimeout = angular.noop;

                $scope.hide = function () {
                    $timeout.cancel($scope.trytimeout);
                    sidebar.removeClass('sy-menu-open');
                    //sidebar.removeClass('move-right');
                };
                $scope.show = function () {
                    $timeout.cancel($scope.trytimeout);
                    sidebar.addClass('sy-menu-open');
                    //sidebar.removeClass('move-right');
                };
                
                win.bind("resize.body", $scope.hide);

                $scope.$on('$destroy', function() {
                    win.unbind("resize.body", $scope.hide);
                });

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
                    $timeout.cancel($scope.trytimeout);
                    $scope.sidebar.toggleClass("sy-menu-open");
                };
                this.hide = function() {
                    $timeout.cancel($scope.trytimeout);
                    $scope.hide();
                };
                this.show = function() {
                    $timeout.cancel($scope.trytimeout);
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