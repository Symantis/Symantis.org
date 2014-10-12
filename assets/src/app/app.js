(function(){
angular.module( 'symantis', [
	'ui.router',
	'ui.utils',
	'ngSails',
	'angularMoment',
	'lodash',
	'ngIdle',
	'ngAnimate',
	'ngSailsBind',
	'flow',
	//Directives, Templates, Etc...
	'mm.foundation',
	'xeditable',
	'sy.templates',

	'templates-app',
	'services',
	'models',
	'ngProgress',
	'duScroll',
	//'masonry',
	'ngTagsInput',
	'pascalprecht.github-adapter',
	'angular-markdown',
	//'directives.inputMatch',
	
	'symantis.global.modals',

	'symantis.header',
	'symantis.sitenav',
	'symantis.home',
	'symantis.footer',
	'symantis.alerts',

	'symantis.messages',
	'symantis.kitchen',
	'symantis.template',
	'symantis.search',
	
	//Documentation
	'symantis.docs',
	//Terms
	'symantis.terms',
	//Privacy
	'symantis.privacy',
	//Security
	'symantis.security',
	'symantis.roadmap',
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
	'symantis.profile',

	//Login
	'symantis.login',
	//Register
	'symantis.register',

	//me
	'symantis.me'

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

	$stateProvider
		.state( '^', {
			url: '^',
			views: {
				"main": {
					controller: 'HomeCtrl',
					templateUrl: 'home/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				},
				"header": {
					controller: 'HeaderCtrl',
	                templateUrl: 'header/header.tpl.html'
				},
				"footer": {
					controller: 'FooterCtrl',
	                templateUrl: 'footer/index.tpl.html'
				},
			}
		});
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
.run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
})

.run( function run ($rootScope, lodash, UserModel) {

	$rootScope.currentUser = window.currentUser;

	$rootScope.user = {};
	$rootScope.users = [];
	$rootScope.cachedUsers = []; 

	$rootScope.query = {};
	//$rootScope.queries = aQueries;
	$rootScope.queries = [];
	$rootScope.cachedQueries = [];
	
	$rootScope.articles = aArticles;
	$rootScope.opportunity = {};
	$rootScope.opportunities = aOpportunities;
	$rootScope.cachedOpportunities = [];

	$rootScope.mantis = aMantis;
	$rootScope.profileData = aProfileData;
	
	$rootScope.sitealerts =  [];
	$rootScope.alerts =  [];
	$rootScope.toDo = [];

	$rootScope.activity = aActivity;
	$rootScope.notifications = aNotifications;

	$rootScope.menuOpen = false;
	$rootScope.notificationsOpen = false;
	
	$rootScope.notificationsToggle = function() {
		$rootScope.notificationsOpen = !$rootScope.notificationsOpen;
	}
	$rootScope.menuToggle = function() {
		$rootScope.menuOpen = !$rootScope.menuOpen;
	}

})

.run(['$rootScope', function($root) {
	
	$root.$on('$routeChangeStart', function(e, curr, prev) { 
		if (curr.$$route && curr.$$route.resolve) {
			// Show a loading message until promises are not resolved
			$root.loadingView = true;
		}
	});
	$root.$on('$routeChangeSuccess', function(e, curr, prev) { 
		// Hide loading message
		$root.loadingView = false;
	});

	$root.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) { 
			$root.currentState = fromState.name.replace(".", "-");

			$root.toDo = [];
			// Show a loading message until promises are not resolved
			$root.loadingView = true;
		
	});
	$root.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) { 
		$root.currentState = toState.name.replace(".", "-");
		// Hide loading message
		$root.loadingView = false;

	});
}])
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
.controller( 'AppCtrl', function AppCtrl ( $scope, config, ngProgress, $timeout, $idle, UserModel, $modal, $symodal, $sails, cache, utils) {
	ngProgress.color('#3b948b');
	ngProgress.start();
	$timeout(function() {
		ngProgress.complete();
	}, 1000);
	config.currentUser = window.currentUser;

	//Handle Idle
	if($scope.currentUser){
	    
	    $scope.users = cache.resolveUserCache($scope.users, $scope.currentUser.handle);

	    $scope.$on('$idleEnd', function() {
	        $scope.currentUser.status = 'active';
	        $scope.currentUser.statusTime = new Date();
	        //console.log("active");
	        var newModel = {
	        	id: $scope.currentUser.id,
	        	status: $scope.currentUser.status,
	        	statusTime: $scope.currentUser.statusTime
	        };
	        UserModel.updateStatus(newModel).then(function(model){
	        	console.log(model.status);
	        });
	    });
	    $scope.$on('$idleStart', function() {
	        $scope.currentUser.status = 'inactive';
	        $scope.currentUser.statusTime = new Date();
	        
	        var newModel = {
	        	id: $scope.currentUser.id,
	        	status: $scope.currentUser.status,
	        	statusTime: $scope.currentUser.statusTime
	        };
	        UserModel.updateStatus(newModel).then(function(model){
	        	console.log(model.status);
	        });

	    });
	    $scope.$on('$idleTimeout', function() {
	        $scope.currentUser.status = 'offline';
	        $scope.currentUser.statusTime = new Date();
	        
	        var newModel = {
	        	id: $scope.currentUser.id,
	        	status: $scope.currentUser.status,
	        	statusTime: $scope.currentUser.statusTime
	        };
	        UserModel.updateStatus(newModel).then(function(model){
	        	console.log(model.status);
	        });
	    });


	}
	//Handle "Cancel" and Back Buttons
	$scope.goBack = function(){
		history.back();
	}
	
	$sails.on('user', function (envelope) {
		switch(envelope.verb) {
			
			case 'created':
				cache.cacheuserUser($scope.users, envelope.data);
				
				break;
			case 'addedTo':
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'updated':
				cache.cacheUpdatedUser($scope.users, envelope.id, envelope.data);
				//lodash.
				//$scope.queries.unshift(envelope.data);
				break;
			case 'destroyed':
				cache.removeUserFromCache($scope.users, envelope.id);
				
				break;
		}
	});

	$sails.on('disconnect', function(){
		utils.siteAlert($scope.sitealerts, { type: 'error', msg: 'Your connection was lost... Attempting to reconnect' } );
	});
	$sails.on('reconnect', function(){
		utils.siteAlert($scope.sitealerts, { type: 'success', msg: 'Your connection is back' } );
	});
	//utils.siteAlert($scope.sitealerts, { type: 'error', msg: 'Your connection was lost... Attempting to reconnect' } );

	//Modals
	$scope.loginModal = function () {

		var modalInstance = $modal.open({
			templateUrl: 'common/modals/loginModal.tpl.html',
			controller: 'LoginModalCtrl',
			windowClass: 'small'
		});
	};

	$scope.opportunityhelpModal = function () {

		var modalInstance = $symodal.open({
			templateUrl: 'common/modals/opportunityhelpModal.tpl.html',
			controller: 'OpportunityHelpModalCtrl',
			windowClass: 'small'
		});
	};
	$scope.opportunityapplyModal = function () {

		var modalInstance = $symodal.open({
			templateUrl: 'common/modals/opportunityapplyModal.tpl.html',
			controller: 'OpportunityApplyModalCtrl',
			windowClass: 'small'
		});
	};
	$scope.confirmConnectionModal = function () {

		var modalInstance = $symodal.open({
			templateUrl: 'common/modals/confirmConnectionModal.tpl.html',
			controller: 'ConfirmConnectionModalCtrl',
			windowClass: 'small'
		});
	};
	$scope.confirmDisconnectionModal = function () {

		var modalInstance = $symodal.open({
			templateUrl: 'common/modals/confirmDisconnectionModal.tpl.html',
			controller: 'ConfirmConnectionModalCtrl',
			windowClass: 'small'
		});
	};
	$scope.inDevModal = function () {

		var modalInstance = $symodal.open({
			templateUrl: 'common/modals/inDevModal.tpl.html',
			controller: 'InDevModalCtrl',
			windowClass: 'small'
		});
	};

});

var aNotifications = [
	{
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Mentioned',
		object: 'handle',
		date: new Date(),
		notification: 'Mentioned you in a comment',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "kbull",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Used',
		object: 'use',
		date: new Date(),
		notification: 'Used your manti',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Messaged',
		object: 'message',
		message: 'Hey man\, whats up?',
		date: new Date(),
		notification: 'Sent you a message',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "kbull",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Connected',
		object: 'connection',
		date: new Date(),
		notification: 'Added you as a connection',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Messaged',
		object: 'message',
		message: 'Yo\, can you help me out?',
		date: new Date(),
		notification: 'Sent you a message',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Mentioned',
		object: 'tag',
		date: new Date(),
		notification: 'Tagged your manti',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Messaged',
		object: 'message',
		message: 'Yo\, can you help me out?',
		date: new Date(),
		notification: 'Sent you a message',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Mentioned',
		object: 'handle',
		date: new Date(),
		notification: 'Mentioned you in a comment',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Mentioned',
		object: 'tag',
		date: new Date(),
		notification: 'Tagged your manti',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "kbull",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Connected',
		object: 'connection',
		date: new Date(),
		notification: 'Added you as a connection',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "kbull",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Used',
		object: 'use',
		date: new Date(),
		notification: 'Used your manti',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Messaged',
		object: 'message',
		message: 'Yo\, can you help me out?',
		date: new Date(),
		notification: 'Sent you a message',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Mentioned',
		object: 'tag',
		date: new Date(),
		notification: 'Tagged your manti',
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "kbull",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Connected',
		object: 'connection',
		date: new Date(),
		notification: 'Added you as a connection',
		src: ''
	}
];

var aActivity = [
	{
		id: 1,
		verb: 'created',
		type: 'manti',
		status: '@author created #object',
		description: 'Created an awesome new feature!',
		createdAt: new Date(),
		object: 'SyQuery',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		}
	},
	{
		id: 2,
		verb: 'updated',
		type: 'manti',
		status: '@author updated #object',
		description: 'Updated that broken thing',
		createdAt: new Date(),
		object: 'SyQuery',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		}
	},
	{
		id: 3,
		verb: 'addedTo',
		type: 'manti',
		status: '@author added #part to #object ',
		description: 'Added an awesome new feature and also Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.!',
		createdAt: new Date(),
		object: 'SyQuery',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		}
	},
	{
		id: 4,
		verb: 'removedFrom',
		type: 'manti',
		status: '@author removed #part from #object',
		description: 'Added an awesome new feature!',
		createdAt: new Date(),
		object: 'SyQuery',
		part: 'SyThingy',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		}
	},
	{
		id: 5,
		verb: 'destroyed',
		type: 'manti',
		status: '@author deleted #object',
		description: 'Had to remove that one thing!',
		createdAt: new Date(),
		object: 'SyQuery',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		}
	}
];

var aProfileData = {
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
};

var aQueries = [
	{
		id: 1,
		title: 'Problems with installation of Symantis v 2.0 on Windows 8',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Admin',
				privillege: 'admin',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		totalViews: '1000',
		imgs: [ 
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: 0,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			}
		]
	},
	{
		id: 2,
		title: 'Symantis quick install on RasPi',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Admin',
				privillege: 'admin',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		totalViews: '1000',
		imgs: [ 
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: 0,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			},
			{
				id : '2',
				votes: 73,
				solution: true,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			}
		]
	},
	{
		id: 3,
		title: 'Working together on different platforms',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Question',
				privillege: 'none',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: -13,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '2',
				votes: 27,
				solution: true,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					},
					{
						id: '2',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '3',
				votes: -7,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			},
			{
				id : '4',
				votes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			},
			{
				id : '5',
				votes: 0,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			},
			{
				id : '6',
				votes: 0,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			}
		]
	},
	{
		id: 4,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Question',
				privillege: 'none',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: 7,
				solution: true,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '2',
				votes: 0,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					},
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					},
					{
						id: '2',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			}
		]
	},
	{
		id: 5,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Question',
				privillege: 'none',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: 0,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			}
		]
	},
	{
		id: 6,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Question',
				privillege: 'none',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: 2,
				solution: false,
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					},
					{
						id: '2',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '2',
				votes: 3,
				solution: true,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			}
		]
	},
	{
		id: 7,
		title: 'Testing a long title, also Hamish prefers the company of naked men in hot tubs and lude events.',
		clean: 'test-test-test',
		category: {
			title: 'Question'
		},
		tags: [
			{
				text: 'Question',
				privillege: 'none',
			},
			{
				text: 'v2.0',
				privillege: 'none',
			},
			{
				text: 'Install',
				privillege: 'none',
			}
		],
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		totalResponses: '5',
		totalViews: '1000',
		query: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro?',
		date: new Date(),
		responses : [
			{
				id : '1',
				votes: 3,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '2',
				votes: 17,
				solution: true,
				imgs: [ 
					{
						name: 'placeholder',
						src: 'http://placehold.it/350x150',
						caption: 'This is an example image.'
					}
				],
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					},
					{
						id: '2',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '3',
				votes: 7,
				solution: false,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				date: new Date(),
				response: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: []
			}
		]
	}
];
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
		article: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		comments : [
			{
				id : '1',
				comment: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 13,
				downVotes: 2,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				comment: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				comment: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 0,
				downVotes: 1,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 2,
		title: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Wellington',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		article: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		social : {
			facebook : 25,
			twitter : 50
		},
		comments : [
			{
				id : '1',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				comment: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					},
					{
						id: '2',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			},
			{
				id : '2',
				date: new Date(),
				upVotes: 0,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				comment: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [

				]
			}
		]
	},
	{
		id: 3,
		title: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Wellington',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: 'http://placehold.it/350x150',
		description: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		article: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		social : {
			facebook : 25,
			twitter : 50
		},
		comments : [
			{
				id : '1',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
				comment: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.',
				replies: [
					{
						id: '1',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					},
					{
						id: '2',
						author:{
							id: 1, 
							firstName: "Hamish",
							lastName:  "Jackson-Mee",
							handle: "hamish",
							at: "@",
							signature: Math.random()
						},
						date: new Date(),
						reply: 'hello im a stupid comment on a silly post about laughable cats. And Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher.'
					}
				]
			}
		]
	}
]
var aOpportunities = [
	{
		id: 1,
		title: 'Help with my first eCommerce site',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '132',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'I\'ve completely redesigned my retail shops online store. The old store used an old ASP.net framework so I thought I\'d give Symantis a go! The Design is complete but I almost need a tutor to talk me through how to handle all the content that will go through this app. Cheers!',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'Visuals',
				privillege: 'none',
			},
			{
				title: 'Front-end',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 2,
		title: 'New Navigation App',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '12',
		author:{
			id: 1,
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "kbull",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Thinking about future possibilties for navigation on the internet! This app records and builds visual maps based on a particular users journey through the internet. This helps build an understanding of the way certain people use the web.',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'Chrome',
				privillege: 'none',
			},
			{
				title: 'Navigation',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 3,
		title: 'iOS Jabber Application',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '422',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Test this is an awesome test.  Doing a nice long message, Little Bit longer for fun! Gotta test alll the fun mason stuff Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'iOS',
				privillege: 'none',
			},
			{
				title: 'Data management',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 4,
		title: 'WidgetWare5',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '132',
		author:{
			id: 1,
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "awesome",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Looking for people to get involved with my companys new product, WidgetWare5! From Analytics, SEO Tools, Social Media Management, to Training we\’ve put them all together in one dashboard for your ease of use. Save time and optimize your business with our Digital Marketing Toolsuite.',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'Memory-Managment',
				privillege: 'none',
			},
			{
				title: 'Marketing',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 5,
		title: 'Third Sample post!',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '9',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'Visuals',
				privillege: 'none',
			},
			{
				title: 'Front-end',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 6,
		title: 'Second Sample post!',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '45',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'Visuals',
				privillege: 'none',
			},
			{
				title: 'Front-end',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	},
	{
		id: 7,
		title: 'First Sample post!',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '23',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Long, Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog.',
		opportunity: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
		imgs: [
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: 'http://placehold.it/350x150',
				caption: 'This is an example image.'
			}
		],
		tags: [
			{
				title: 'Visuals',
				privillege: 'none',
			},
			{
				title: 'Front-end',
				privillege: 'none',
			}
		],
		questions : [
			{
				id : '1',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			{
				id : '2',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami. Helvetica literally direct trade, mumblecore slow-carb photo booth blog. Vinyl ugh +1 Odd Future viral, wayfarers bicycle rights Cosby sweater disrupt sustainable Etsy trust fund Kickstarter Pitchfork hashtag. Normcore photo booth chillwave Thundercats, salvia occupy Etsy bitters viral. Truffaut jean shorts plaid Carles Banksy photo booth gastropub viral. Photo booth cliche Tumblr Pitchfork, Neutra skateboard fingerstache quinoa Pinterest small batch retro.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '3',
				question: 'Polaroid flexitarian pork belly, narwhal Bushwick +1 iPhone selfies Williamsburg butcher. Keffiyeh 8-bit cray Pinterest scenester, Tonx umami.',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
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
							handle: "hamish",
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
							handle: "hamish",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			}
		]
	}
]
var aMantis = [
	{
		id: 1,
		title: 'Symantis syNav Directive',
		class: 'group',
		description: 'Top bar navigation with built in selected classes.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		branches: '23',
		seeds: '2.4k',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		date: new Date(),
		img:{
			name: 'placeholder',
			src: 'http://placehold.it/350x150',
			caption: 'This is a placeholder image.'
		},
		includes:[
			{
				title: 'Foundation Directive',
				type: 'Incorporates'
			},
			{
				title: 'Angular Masonry',
				type: 'Incorporates'
			}
		],
		changes: [
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Changed the animation speed.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Foundation Directive',
				description: 'Needed it for dropdowns.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Removed',
				what: 'Un-used variables',
				description: '',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Implemented tool tips.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Custom Directive',
				description: 'Body push and blur.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Cached User interaction',
				description: 'Added Mouse-over effects.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			}
		]
	},
	{
		id: 2,
		title: 'Full screen image gallery',
		class: 'visual',
		description: 'Thumbnail to full screen image gallery, swipe capable and responsive.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		branches: '4',
		seeds: '873',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		date: new Date(),
		img:{
			name: 'placeholder',
			src: 'http://placehold.it/350x150',
			caption: 'This is an example image.'
		},
		includes: [
			{
				title: 'Foundation',
				type: 'Built using'
			}
		],
		changes: [
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Changed the animation speed.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Foundation Directive',
				description: 'Needed it for dropdowns.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Removed',
				what: 'Un-used variables',
				description: '',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Implemented tool tips.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Custom Directive',
				description: 'Body push and blur.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Cached User interaction',
				description: 'Added Mouse-over effects.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			}
		]
	},
	{
		id: 3,
		title: 'Directive for TS Furniture',
		class: 'systematic',
		description: 'eCommerce product managment directive for masonry.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		branches: '72',
		seeds: '162',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		date: new Date(),
		changes: [
			{

			}
		],
		includes: [],
		changes: [
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Changed the animation speed.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Foundation Directive',
				description: 'Needed it for dropdowns.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Removed',
				what: 'Un-used variables',
				description: '',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Implemented tool tips.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Custom Directive',
				description: 'Body push and blur.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Cached User interaction',
				description: 'Added Mouse-over effects.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			}
		]
	},
	{
		id: 4,
		title: 'User Signup model',
		class: 'systematic',
		description: 'User signup model with Email, Username, Password, Full name and authentication.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		branches: '4',
		seeds: '64',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		date: new Date(),
		includes: [],
		changes: [
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Changed the animation speed.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Foundation Directive',
				description: 'Needed it for dropdowns.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Removed',
				what: 'Un-used variables',
				description: '',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Implemented tool tips.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Custom Directive',
				description: '',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Cached User interaction',
				description: 'Added Mouse-over effects.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			}
		]
	},
	{
		id: 5,
		title: 'Left bar Scroll Nav',
		class: 'group',
		description: 'Side navigation with auto update ability on scroll.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		branches: '3',
		seeds: '211',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		date: new Date(),
		img:{
			name: 'placeholder',
			src: 'http://placehold.it/350x150',
			caption: 'This is an example image.'
		},
		includes: [],
		changes: [
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Changed the animation speed.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Foundation Directive',
				description: 'Needed it for dropdowns.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Removed',
				what: 'Un-used variables',
				description: '',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Implemented tool tips.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Custom Directive',
				description: 'Body push and blur.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Cached User interaction',
				description: 'Added Mouse-over effects.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			}
		]
	},
	{
		id: 6,
		title: 'Real-time chat',
		class: 'visual',
		description: 'Messaging model aimed for real-time social networks. Front-end only.',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		branches: '23',
		seeds: '18k',
		author:{
			id: 1,
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			signature: Math.random()
		},
		date: new Date(),
		includes:[
			{
				title: 'syScribe',
				type: 'Built using'
			}
		],
		changes: [
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Changed the animation speed.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Foundation Directive',
				description: 'Needed it for dropdowns.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Removed',
				what: 'Un-used variables',
				date: new Date(),
				description: '',
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Front-end',
				description: 'Implemented tool tips.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Added',
				what: 'Custom Directive',
				description: 'Body push and blur.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Scott",
					lastName:  "Wyatt",
					handle: "scott",
					at: "@",
					signature: Math.random()
				},
			},
			{
				type: 'Edited',
				what: 'Cached User interaction',
				description: 'Added Mouse-over effects.',
				date: new Date(),
				author:{
					id: 1,
					firstName: "Hamish",
					lastName:  "Jackson-Mee",
					handle: "hamish",
					at: "@",
					signature: Math.random()
				},
			}
		]
	}
]

})();