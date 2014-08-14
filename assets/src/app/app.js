(function(){
angular.module( 'symantis', [
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'ngIdle',
	'mm.foundation',
	//'ui.bootstrap',
	'templates-app',
	'services',
	'models',
	//'mm.foundation',
	'symantis.header',
	'symantis.sitenav',
	'symantis.home',
	'symantis.about',
	'symantis.messages',
	'symantis.kitchen',
	'symantis.template',
	'symantis.search',
	'symantis.docs',
	'symantis.community',
	'symantis.start',
	'symantis.chat',
	'symantis.creator'
])

.config( function syAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
	// $urlRouterProvider.otherwise( '/home' );
	$urlRouterProvider.otherwise(function ($injector, $location) {
		console.log($location);
		
		if ($location.$$url === '/') {
			window.location = '/home';
		}else {
			// pass through to let the web server handle this request
			window.location = $location.$$absUrl;
		}
	});

	$locationProvider.html5Mode(true);
})

.config(['$keepaliveProvider', '$idleProvider', function($keepaliveProvider, $idleProvider) {
  $idleProvider.idleDuration(15);
  $idleProvider.warningDuration(15);
  $keepaliveProvider.interval(10);
}])

.run(['$idle', function($idle) {
  
  $idle.watch();

}])

.run( function run () {
	moment.lang('en');
	
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
	config.currentUser = window.currentUser;

	$scope.syMenuOpen = false;
	$scope.syMenuToggle = function(){
		$scope.syMenuOpen = !$scope.syMenuOpen;
	}
	$scope.syMenuToggleOn = function(){
		$scope.syMenuOpen = true;
	}
	$scope.syMenuToggleOff = function(){
		$scope.syMenuOpen = false;
	}

	$scope.syMenuTopOpen = false;
	$scope.syMenuTopToggle = function(){
		$scope.syMenuTopOpen = !$scope.syMenuTopOpen;
	}
	$scope.syMenuTopToggleOn = function(){
		$scope.syMenuTopOpen = true;
	}
	$scope.syMenuTopToggleOff = function(){
		$scope.syMenuTopOpen = false;
	}

	$scope.syMenuBottomOpen = false;
	$scope.syMenuBottomToggle = function(){
		$scope.syMenuBottomOpen = !$scope.syMenuBottomOpen;
	}
	$scope.syMenuBottomToggleOn = function(){
		$scope.syMenuBottomOpen = true;
	}
	$scope.syMenuBottomToggleOff = function(){
		$scope.syMenuBottomOpen = false;
	}

});

})();