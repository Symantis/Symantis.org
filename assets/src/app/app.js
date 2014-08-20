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
	
	//Community
	'symantis.community',
	'symantis.connections',
	'symantis.queries',
	'symantis.tags',
	//End Community

	'symantis.start',
	'symantis.chat',
	'symantis.creator',
	'symantis.news',
	
	'symantis.profile'
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

.run( function run ($rootScope, $sails, lodash) {
	$rootScope.currentUser = oCurrentUser;
	$rootScope.users = aUsers;

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

var oCurrentUser = {
	id: 1, 
	name: "Hamish Jackson-Mee",
	handle: "The man",
	at: "@"
}
var aUsers = [
	{
		id: 1, 
		name: "Hamish Jackson-Mee",
		handle: "The man",
		at: "@",
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'online',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.'
	},
	{
		id: 2, 
		name: "Scott Wyatt",
		handle: "awesome",
		at: "@",
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'online',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.'
	},
	{
		id: 3, 
		name: "Katelin",
		handle: "kBull",
		at: "@",
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'offline',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.'
	},
	{
		id: 4, 
		name: "Anthony TwoNuts",
		handle: "2Nuts",
		at: "@",
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'offline',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.'
	},
	{
		id: 4, 
		name: "Best Person",
		handle: "bP",
		at: "@",
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'offline',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.'
	}
]

})();