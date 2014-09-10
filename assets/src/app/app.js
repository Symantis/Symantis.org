(function(){
angular.module( 'symantis', [
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'ngIdle',
	'ngAnimate',
	'mm.foundation',
	
	//Directives, Templates, Etc...
	'sy.templates',

	'templates-app',
	'services',
	'models',
	'ngProgress',
	'duScroll',
	
	'symantis.header',
	'symantis.sitenav',
	'symantis.home',

	'symantis.messages',
	'symantis.kitchen',
	'symantis.template',
	'symantis.search',
	
	//Documentation
	'symantis.docs',
	
	//More
	'symantis.more',

	//Community
	'symantis.community',

	//Getting Started
	'symantis.start',
	
	//Chat
	'symantis.chat',
	
	//Creator App
	'symantis.creator',
	
	//Profile
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
	$rootScope.queries = aQueries;
	$rootScope.articles = aArticles;

})
/*
.config(function config( $stateProvider ) {
	$stateProvider.state('/', {
		url: '/',
		views: {
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
                templateUrl: 'header/header.tpl.html'
			}
		}
	});
})
*/
.controller( 'AppCtrl', function AppCtrl ( $scope, config, ngProgress, $timeout ) {
	ngProgress.color('#3b948b');
	ngProgress.start();
	$timeout(function() {
		ngProgress.complete();
	}, 1000);
	config.currentUser = window.currentUser;

});


var oCurrentUser = {
	id: 1, 
	firstName: "Hamish",
	lastName:  "Jackson-Mee",
	handle: "theman",
	at: "@"
}
var aUsers = [
	{
		id: 1, 
		firstName: "Hamish",
		lastName:  "Jackson-Mee",
		handle: "theman",
		at: "@",
		signature: Math.random(),
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'online',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		curManti: [
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		],
		reContributions: [
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		]
	},
	{
		id: 2, 
		firstName: "Scott",
		lastName:  "Wyatt",
		handle: "awesome",
		at: "@",
		signature: Math.random(),
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'online',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		curManti: [
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		],
		reContributions: [
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		]
	},
	{
		id: 3, 
		firstName: "Katelin",
		lastName:  "Bull",
		handle: "kBull",
		at: "@",
		signature: Math.random(),
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'offline',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		curManti: [
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		],
		reContributions: [
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		]
	},
	{
		id: 4, 
		firstName: "Anthony",
		lastName:  "Twonuts",
		handle: "2Nuts",
		at: "@",
		signature: Math.random(),
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'offline',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		curManti: [
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		],
		reContributions: [
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		]
	},
	{
		id: 5, 
		firstName: "Best",
		lastName:  "Person",
		handle: "bP",
		at: "@",
		signature: Math.random(),
		tags: ['Designer', 'Developer'],
		professed: 'Lorem ipsum is a shit placeholder text. Meanwhile I\'m a skilled developer',
		status: 'offline',
		bio: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		curManti: [
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				title: 'SyScribe',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		],
		reContributions: [
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			},
			{
				type: 'New Branch',
				title: 'SyQuery',
				description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
			}
		]
	}
]
var aQueries = [
	{
		id: 1,
		title: 'Problems with installation of Symantis v 2.0 on Windows 8',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Admin',
				privillege: 'admin',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	},
	{
		id: 2,
		title: 'Symantis quick install on RasPi',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Admin',
				privillege: 'admin',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	},
	{
		id: 3,
		title: 'Working together on different platforms',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Question',
				privillege: 'none',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	},
	{
		id: 4,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Question',
				privillege: 'none',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	},
	{
		id: 5,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Question',
				privillege: 'none',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	},
	{
		id: 6,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Question',
				privillege: 'none',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	},
	{
		id: 7,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		category: {
			title: 'Question'
		},
		tags: [
			{
				title: 'Question',
				privillege: 'none',
			},
			{
				title: 'v2.0',
				privillege: 'none',
			},
			{
				title: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		replies : [
			{
				id : '1'
			},
			{
				id : '2'
			},
			{
				id : '3'
			}
		],
		totalReplies: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date()
	}
	
]

var aArticles = [
	{
		id: 1,
		title: 'Symantis.org is out of Beta!',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: 'http://placehold.it/350x150',
		description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		article: '',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		comments : [
			{
				id : '1',
				comment: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "theman",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: [
					{
						id: '1',
						reply:'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "theman",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					},
					{
						id: '2',
						reply:'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "theman",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				],
				date: new Date(),
			},
			{
				id : '2',
				comment: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "theman",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: [
				],
				date: new Date(),
			},
			{
				id : '3',
				comment: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "theman",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: [
					{
						id: '1',
						reply:'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "theman",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					},
					{
						id: '2',
						reply:'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "theman",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				],
				date: new Date(),
			}
		],
		social : {
			facebook : 12,
			twitter : 50
		}
	},
	{
		id: 2,
		title: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Wellington',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		article: '',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "theman",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		comments : [
			{
				id : '1'
			},
			{
				id : '2'
			}
		],
		social : {
			facebook : 25,
			twitter : 50
		}
	}
]

})();