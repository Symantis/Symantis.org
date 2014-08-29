(function(){
angular.module( 'symantis', [
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'ngIdle',
	'ngAnimate',
	'mm.foundation',
	'sy.templates',
	//'ui.bootstrap',
	'templates-app',
	'services',
	'models',
	'ngProgress',
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
	'symantis.news',
	'symantis.tags',
	//End Community

	'symantis.start',
	'symantis.chat',
	'symantis.creator',
	
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
		totalReplies: '5',
		totalViews: '1000',
		query: 'Lorem ipsum',
		date: '12-08-2014'
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
		totalReplies: '5',
		totalViews: '1000',
		query: 'Lorem ipsum',
		date: '12-08-2014'
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
		totalReplies: '5',
		totalViews: '1000',
		query: 'Lorem ipsum',
		date: '12-08-2014'
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
		totalReplies: '5',
		totalViews: '1000',
		query: 'Lorem ipsum',
		date: '12-08-2014'
	}
	
]

})();