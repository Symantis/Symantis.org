
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
	'gridster',
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
	'symantis.currency',
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
	
	$rootScope.article = {};
	$rootScope.news = [];

	$rootScope.opportunity = {};
	$rootScope.opportunities = aOpportunities;
	$rootScope.cachedOpportunities = [];

	$rootScope.mantis = aMantis;
	$rootScope.profileData = aProfileData;

	$rootScope.todaysDate = new Date();
	
	$rootScope.sitealerts =  [];
	$rootScope.alerts =  [];
	$rootScope.toDo = [];

	$rootScope.activity = aActivity;
	$rootScope.notifications = aNotifications;

	$rootScope.menuOpen = false;
	$rootScope.menuHide = false;
	$rootScope.notificationsOpen = false;
	
	$rootScope.notificationsToggle = function() {
		console.log("Toggled");
		$rootScope.notificationsOpen = !$rootScope.notificationsOpen;
		//console.log($rootScope.notificationsOpen);

	}
	$rootScope.notificationsClose = function() {
		$rootScope.notificationsOpen = false;
		//$rootScope.$apply();
		/*
		if($rootScope.notificationsOpen == true){
			$rootScope.notificationsToggle();
		}
		*/
	}
	$rootScope.menuToggle = function() {
		$rootScope.menuOpen = !$rootScope.menuOpen;
	}
	$rootScope.menuHide = function() {
		$rootScope.menuHide = true;
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
.controller( 'AppCtrl', function AppCtrl ( $scope, $state, config, ngProgress, $timeout, $idle, UserModel, $modal, $symodal, $sails, cache, utils) {
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


	}else{

		$scope.$on('$idleTimeout', function() {
	        console.log("Idle as, let's go home");
	        $state.go('home');
	    });

	}


	$scope.tagUserClick = function(e) {
		var tagText = e.target.innerText;
		console.log(tagText);
            // tagText is '@Joe'. You could use this to verify
            // that your app has a 'Joe' user and then redirect
            // to a view that displays this user profile.
    };

    $scope.tagTermClick = function(e) {
		var tagText = e.target.innerText;
		console.log(tagText);
            // tagText is '#gun'. You could use this to display
            // all posts/info that has a hashtag with this value.
    };
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
				console/log("User Added To");
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'updated':
				cache.cacheUpdatedUserId($scope.users, envelope.id, envelope.data);
				//lodash.
				//$scope.queries.unshift(envelope.data);
				break;
			case 'destroyed':
				cache.removeUserFromCache($scope.users, envelope.id);
				
				break;
		}
	});

	$sails.on('query', function (envelope) {
		switch(envelope.verb) {
			
			case 'created':
				cache.cacheCreatedQuery($scope.queries, envelope.data);
				
				break;
			case 'addedTo':
				console.log("Query Added To");
				console.log(envelope);
				if(envelope.attribute == "responses"){
					cache.getAndCacheReponse($scope.queries, envelope.addedId );
				}
				//Object {id: "543e3473724fae3f3b745f85", verb: "addedTo", attribute: "responses", addedId: "543e34d1724fae3f3b745f86"}
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'updated':
				console.log("Query Updated");
				console.log(envelope);
				cache.cacheUpdatedQuery($scope.queries, envelope.id, envelope.data);
				//lodash.
				//$scope.queries.unshift(envelope.data);
				break;
			case 'destroyed':
				cache.removeQueryFromCache($scope.queries, envelope.id);
				
				break;
		}
	});

	$sails.on('response', function (envelope) {
		switch(envelope.verb) {
			
			case 'created':
				console.log(envelope);
				cache.cacheNewQueryReponse($scope.queries, envelope.data);
				
				break;
			case 'addedTo':
				console.log("Response Added To");
				console.log(envelope);
				if(envelope.attribute = "replies"){
					cache.getAndCacheReply($scope.queries, envelope.addedId);
				}
				//Object {id: "543e0a903097a4393459e5c9", verb: "addedTo", attribute: "replies", addedId: "543e297e34af6e4939475b1e"}
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'updated':
				console.log(envelope);
				//cache.cacheUpdatedQuery($scope.queries, envelope.id, envelope.data);
				//lodash.
				//$scope.queries.unshift(envelope.data);
				break;
			case 'destroyed':
				console.log(envelope);
				//cache.removeQueryFromCache($scope.queries, envelope.id);
				
				break;
		}
	});

	$sails.on('comment', function (envelope) {
		switch(envelope.verb) {
			
			case 'created':
				console.log(envelope);
				if(envelope.data.controller == 'query'){
					cache.cacheNewQueryReponseReply($scope.queries, envelope.data);	
				}
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'addedTo':
				console/log("Comment Added To");
				console.log(envelope);

				
				//cache.cacheNewQuery($scope.queries, envelope.data);
				
				break;
			case 'updated':
				console.log(envelope);
				//cache.cacheUpdatedQuery($scope.queries, envelope.id, envelope.data);
				//lodash.
				//$scope.queries.unshift(envelope.data);
				break;
			case 'destroyed':
				console.log(envelope);
				//cache.removeQueryFromCache($scope.queries, envelope.id);
				
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
		viewed: false,
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Used',
		object: 'use',
		date: new Date(),
		notification: 'Used your manti',
		viewed: false,
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
		viewed: false,
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Connected',
		object: 'connection',
		date: new Date(),
		notification: 'Added you as a connection',
		viewed: true,
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
		viewed: true,
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
		viewed: true,
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
		viewed: true,
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
		viewed: true,
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
		viewed: true,
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Connected',
		object: 'connection',
		date: new Date(),
		notification: 'Added you as a connection',
		viewed: true,
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Used',
		object: 'use',
		date: new Date(),
		notification: 'Used your manti',
		viewed: true,
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
		viewed: true,
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
		viewed: true,
		src: ''
	},
	{
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		verb: 'Connected',
		object: 'connection',
		date: new Date(),
		notification: 'Added you as a connection',
		viewed: true,
		src: ''
	}
];

var aActivity = [
	{
		id: 1,
		verb: 'created',
		status: '@author #verb #child in #parent',
		description: 'Created this awesome query language that can be used in the Creator App',
		parent: 'SyQuery',
		child: '',
		createdAt: new Date(),
		type: 'Manti',
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
		verb: 'created',
		status: '@author #verb #child in #parent',
		description: 'Created the Backbone for Symantis.org network',
		parent: 'Backbone.js',
		child: '',
		createdAt: new Date(),
		type: 'Manti',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		img:{
			name: 'placeholder',
			src: '/img/placeholder/backbone.png',
			caption: 'This is a placeholder image.'
		}
	},
	{
		id: 3,
		verb: 'addedTo',
		status: '@author #verb #child in #parent',
		description: 'Added d3 animations to home.',
		parent: 'Symantis.org',
		child: 'Home',
		createdAt: new Date(),
		type: 'Manti',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		img:{
			name: 'placeholder',
			src: '/img/placeholder/d3js.png',
			caption: 'This is a placeholder image.'
		}
	},
	{
		id: 4,
		verb: 'removed',
		status: '@author #verb #child in #parent',
		description: 'Removed old landing page.',
		parent: 'Symantis.org',
		child: 'Home',
		createdAt: new Date(),
		type: 'Manti',
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
		verb: 'mentioned',
		status: '@author #verb #child in #parent',
		description: '',
		parent: 'Comment',
		child: '',
		createdAt: new Date(),
		type: 'Query',
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		user: {
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		img:{
			name: 'placeholder',
			src: '/img/placeholder/ui-header.jpg',
			caption: 'This is a placeholder image.'
		}
	},
	{
		id: 6,
		verb: 'tagged',
		status: '@author #verb #child in #parent',
		description: '',
		parent: 'SyQuery',
		child: '',
		createdAt: new Date(),
		type: 'Manti',
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		user: {
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
		id: 7,
		verb: 'removed',
		status: '@author #verb #child in #parent',
		description: 'Removed Connections dialogue from Community.',
		parent: 'Symantis.org',
		child: 'Community',
		createdAt: new Date(),
		type: 'Manti',
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
		id: 8,
		verb: 'updated',
		status: '@author #verb #child in #parent',
		description: 'Changed a few front-end animations',
		parent: 'Symantis.org',
		child: 'Home',
		createdAt: new Date(),
		type: 'Manti',
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
		id: 9,
		verb: 'removed',
		status: '@author #verb #child in #parent',
		description: '',
		parent: 'Post Uni Front-end Work',
		child: '',
		createdAt: new Date(),
		type: 'Opportunity',
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelin",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		img:{
			name: 'placeholder',
			src: '/img/placeholder/mephobox.png',
			caption: 'This is a placeholder image.'
		}
	},
	{
		id: 10,
		verb: 'mentioned',
		status: '@author #verb #child in #parent',
		description: 'Katelin you should go for this!',
		parent: 'Comment',
		child: '',
		createdAt: new Date(),
		type: 'Opportunity',
		author:{
			id: 1, 
			firstName: "Hamish",
			lastName:  "Jackson-Mee",
			handle: "hamish",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		user: {
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelin",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		img:{
			name: 'placeholder',
			src: '/img/placeholder/navigation.jpg',
			caption: 'This is a placeholder image.'
		}
	},
	{
		id: 11,
		verb: 'tagged',
		status: '@author #verb #child in #parent',
		description: '',
		parent: 'SyQuery',
		child: '',
		createdAt: new Date(),
		type: 'Manti',
		author:{
			id: 1, 
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		user: {
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
			description: 'The IDE/GUI hybrid for the Symantis Creator App. Allowing anyone to build and create for the web. ',
		},
		{
			title: 'SyQuery',
			description: 'The Symantis Query library. This library allows for storing on Angular.js partials and SCSS CSS in JSON.',
		},
		{
			title: 'Parallax Scroll',
			description: 'A parallax scrolling plugin. Plug and Play driven, this will help anyone with creating parallax web experiences.',
		},
		{
			title: 'Responsive Template',
			description: 'A simple template for mobile, tablet and desktop screen sizes.',
		}
	],
	reContributions: [
		{
			type: 'New Branch',
			title: 'SyQuery',
			description: 'Added a bunch of new variables to help people customize and drive their stored data.',
		},
		{
			type: 'Added',
			title: 'Symantis.org',
			description: 'Added a mapping section to Symantis.org. This is only the initial map, we still need to work on this..',
		},
		{
			type: 'Forked',
			title: 'SyQuery',
			description: 'Had to fork SyQuery as I\'m making some dramatic changes and didn\'t want to break it for you guys',
		},
		{
			type: 'Removed',
			title: 'Flash',
			description: 'Removed all ActionScript support from the Symantis system. We do not like flash!',
		},
		{
			type: 'New Manti',
			title: 'Front-End GUI',
			description: 'Made the front-end for the SYmantis Creator application. This is the GUI view only for the the mapping tools, and des/dev views.',
		}
	]
};

var aArticles = [
	{
		id: 1,
		title: 'Australia\'s First 3D Printing Factory Aims to Shape Future of Manufacturing',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: '/img/placeholder/3d.jpg',
 		description: 'MELBOURNE — As industry stalwarts Ford and Holden start to wind down local operations, there is an air of uncertainty around Australian manufacturing at the moment. But a new state-of-the-art facility in outer Melbourne is looking help shape its future, and is counting on a stockpile of cutting-edge 3D printers to lead the way.',
		article: 'MELBOURNE — As industry stalwarts Ford and Holden start to wind down local operations, there is an air of uncertainty around Australian manufacturing at the moment. But a new state-of-the-art facility in outer Melbourne is looking help shape its future, and is counting on a stockpile of cutting-edge 3D printers to lead the way. Opening last Friday, the Advanced Manufacturing Plant, operated by local 3D printer distributor Objective3D, has more than 15 machines on hand ready to build parts and serve clients from a variety of sectors. "Overall it is very diverse," Matt Minio, managing director of Objective3D, told Mashable. "It starts in education, mining, automotive and includes anything from dental to trucking and rail." Minio describes the equipment at the Advanced Manufacturing Plant as very high end, capable of creating products with exactly the same materials as those used in typical manufacturing. Weve got extrusion and inkjet-based systems, he said. We have the latest state-of-the-art printer, the Stratasys Objet500 Connex3, which runs over 1,200 materials including rubber, hard plastics and clear materials. We can tint them, we can run them in full colour." While there has been much said of 3D printings potential to really shake up manufacturing, Minio explains the factorys role will largely be to supplement more traditional means of production. "This is not something that will replace high-volume manufacturing," he said. "What we plan on doing is specialising in niche and customisable markets, which open the door to new opportunities where it might not have been affordable in the past." This could prove a huge boon for local entrepreneurs and small businesses, who may find unprecedented opportunity to trial and refine new products without the burdensome costs that accompany large-scale production runs. Through its printing, Objective3D says it sees typical cost savings of between 50 and 80 percent over traditional manufacturing methods. "It comes down to volume," says Minio. "When a designer finishes a design it can take two months to turn it around, whereas we can print a product on the same day. This also enables the business to try out new things and get their product to market a lot quicker. And that is where the profits are, with getting to market as soon as possible becoming more important all the time." Have something to add to this story? Share it in the comments.',
		author:{
			id: 1, 
			firstName: "Scott",
			lastName:  "Wyatt",
			handle: "scott",
			at: "@",
			status: 'online',
			signature: Math.random()
		},
		social : {
			facebook : 23,
			twitter : 44
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
		title: 'Google Warns of Design Vulnerability in SSL 3.0',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: '/img/placeholder/google-news.jpg',
 		description: 'Google on Tuesday announced that it has discovered a \"vulnerability in the design of SSL version 3.0\". The vulnerability, which Google announced on its security blog and detailed in a security advisory [PDF link], \"allows the plaintext of secure connections to be calculated by a network attacker.\"',
		article: "Google on Tuesday announced that it has discovered a \"vulnerability in the design of SSL version 3.0”.\n \n The vulnerability, which Google announced on its security blog and detailed in a security advisory [PDF link], \"allows the plaintext of secure connections to be calculated by a network attacker.\" \n \n Google\'s Bodo Möller discovered the issue, along with Googlers Thai Duong and Krzysztof Kotowicz. This isn\'t the first time SSL — the security protocol that the Internet uses for encryption and security — has had issues. Earlier this year, a years-old bug in OpenSSL known as Heartbleed was publicly revealed. This particular bug effects SSL version 3.0, which Google notes is nearly 15 years old. It has been replaced by TLS 1.0 and TLS 1.1 and TLS 1.2, but the discovery is still a concern because most modern TLS implementations are still backward compatible with Open SSL 3.0. Most web browsers still support SSL 3.0 and can even drop-down to support the old protocol if something else isn\'t working or if use of the protocol is triggered by a network attacker. Google says that disabling SSL 3.0 support is enough to mitigate the issue, but that could cause compatibility issues. Therefore, the company has announced support for TLS_FALLBACK_SCSV, which will prevent SSL 3.0 from being used when a client attempts to retry a failed connection. Google says that Chrome has supported TLS_FALLBACK_SCSV since February and that it is testing changes Tuesday that will disable fallback to SSL 3.0. In the coming months, Google hopes to remove support for SSL 3.0 from all of its products. <h1>Silver lining</h1> Although the problem Google has discovered looks severe, the good news is that it can be mitigated by upgrading to a newer version of a web browser. In the case of Google Chrome, Mozilla Firefox and Opera, the rolling, automatic-updating nature of the browser means that users can get fixes quickly. We expect Mozilla (Firefox), Microsoft (Internet Explorer) and Apple (Safari) to issue updates to its browsers to support the TLS_FALLBACK_SCSV and to follow Google\'s lead in dropping support for SSL 3.0. For websites that may break if SSL 3.0 support is dropped, the onus will be on those site maintainers to update their code to modern standards immediately. This story is still developing. Have something to add to this story? Share it in the comments.",
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
		id: 3,
		title: 'Lenovo Yoga 3 Pro Design Was Inspired by Fine Watches',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: '/img/placeholder/lenova-news.jpg',
		description: 'The first Lenovo Yoga laptop was an inspired piece of hybrid design: a full-featured laptop that could be used in four different modes, thanks to a special hinge that could unfold the screen a full 360 degrees.',
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
		id: 4,
		title: 'Joseph Gordon-Levitt Unveils Adobe\'s Most Promising Experiments',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: '/img/placeholder/adobe-news.jpg',
		description: 'Adobe is fond of referring to certain features as &quot;Photoshop magic,&quot; or simple tools that make complex processes simpler. Many of these “magical” features begin as experiments in the company’s labs.',
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
	},
	{
		id: 5,
		title: '9 Reasons You Should Know a Little HTML and CSS',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		date: new Date(),
		img: '/img/placeholder/code-news.jpg',
		description: 'You&#039;ve heard over and over that everyone should learn to code. Alright already! But as a writer, marketer, finance guru or nonprofit worker, why in the world should you get into coding?',
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
	},

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
		description: 'Designer with a complete plan looking for a Devloper to help me through the technical aspect of making an online store',
		opportunity: 'I\'ve completely redesigned my retail shops online store. The old store used an old ASP.net framework so I thought I\'d give Symantis a go! The Design is complete but I almost need a tutor to talk me through how to handle all the content that will go through this app. Cheers!',
		imgs: [
			{
				name: 'placeholder',
				src: '/img/placeholder/first-ecommerce.jpg',
				caption: 'This is an example image.'
			},
			{
				name: 'placeholder',
				src: '/img/placeholder/ecommerce-logo.png',
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
				question: 'Hi there, just wondering what your level of skill is with developing. Have you used Javascript at all before?',
				date: new Date(),
				upVotes: 9,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Steven",
					lastName:  "Smith",
					handle: "steveo",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: [
					{
						id: '1',
						reply:'Hiya! I\'ve only done a few tutorials on Javascript through Code Academy. While I understand the basic syntax, I\'m not sure how to apply it in context. I am wanting to learn though, not just have someone do it all for me.',
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
						reply:'Ok cool. I\'m pretty interested. Just gotta finish off my current project first!',
						author:{
							id: 1, 
							firstName: "Steven",
							lastName:  "Smith",
							handle: "steveo",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					}
				]
			},
			
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
		opportunity: 'Thinking about future possibilties for navigation on the internet! This app records and builds visual maps based on a particular users journey through the internet. This helps build an understanding of the way certain people use the web. I come from a developer background but have always had a strong interest in User Experinece. I\'m looking for a person (or people) to work on an experimental and evolving project that explores new territory on this topic. I\'m not too fussy on your background, I just want some awesome new ideas and minds coming together over this passion!',
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
				question: 'Sounds really cool man! I don\'t really have any experience in this field but am excited to see what you produce!',
				date: new Date(),
				upVotes: 4,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Janice",
					lastName:  "Tonks",
					handle: "Janx",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: [
					{
						id: '1',
						reply:'Experience doesn\'t matter! It\'s passion that I really care about. Join in, it\'ll be great!',
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
						reply:'You may have convinced me good sir!',
						author:{
							id: 1, 
							firstName: "Janice",
							lastName:  "Tonks",
							handle: "Janx",
							at: "@",
							status: 'online',
							signature: Math.random()
						},
						date: new Date()
					},
					{
						id: '3',
						reply:'Awesome! I\'ve connected with you. Can\'t wait to work with you!',
						author:{
							id: 1, 
							firstName: "Janice",
							lastName:  "Tonks",
							handle: "Janx",
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
				question: 'Can you give some more details please? Seems a bit vague as to what you want here ...',
				date: new Date(),
				upVotes: 1,
				downVotes: 3,
				author:{
					id: 1, 
					firstName: "Bob",
					lastName:  "Orley",
					handle: "BobOrley123",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
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
		description: 'Looking to bring to life an app concept that I created during my time at University. The visuals and UX have been designed so looking for someone who has experience with social networking functionality.',
		opportunity: 'Jabber is an iOS app concept that allows people to easy show what their plans are during any given time. They can signal whether they are going out, staying in or are unsure. It will allow people to easily find and connect with their friends when wanting to spocialize without having to go to the effort of asking them all individually. I\'m hoping to tie the contacts system in through Facebook somehow.',
		imgs: [
			{
				name: 'placeholder',
				src: '/img/placeholder/jabber.jpg',
				caption: 'This is an example image.'
			},
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
				question: 'Looks cool dude! Definitely something I would use!',
				date: new Date(),
				upVotes: 5,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Cam",
					lastName:  "Clark",
					handle: "seesee",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
			{
				id : '2',
				question: 'Nice idea, I\'m wondering if you could post some more images though so I could get a feel for your ideas for the interface and contact handling. Cheers!',
				date: new Date(),
				upVotes: 1,
				downVotes: 0,
				author:{
					id: 1, 
					firstName: "Stacey",
					lastName:  "Geare",
					handle: "staceg",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: []
			},
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
		opportunity: 'Looking for people to get involved with my companys new product, WidgetWare5! From Analytics, SEO Tools, Social Media Management, to Training we\’ve put them all together in one dashboard for your ease of use. Save time and optimize your business with our Digital Marketing Toolsuite.',
		imgs: [
			{
				name: 'placeholder',
				src: '/img/placeholder/widgetware.png',
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
		questions : []
	},
	{
		id: 5,
		title: 'User Testers Wanted',
		clean: function(){
			return this.title.replace(/[\s]/g, '-');
		},
		totalViews: '9',
		author:{
			id: 1,
			firstName: "Katelin",
			lastName:  "Bull",
			handle: "katelinnz",
			at: "@",
			signature: Math.random()
		},
		social : {
			facebook : 12,
			twitter : 50
		},
		date: new Date(),
		description: 'Looking for a range of people to test the navigation and UX of a new app I\'ve designed.',
		opportunity: 'I have designed an app that allows people to store all of their user details and passwords etc for various sites in one place. It has a fair amount of security and I\'m worried that it gets too overly complex when it comes to storing and retrieving date. I\'m after a range of people from different background to test the app and give feedback. I will be after detailed thoughts of what is working and what needs improvements etc.',
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
				question: 'Hi I\'m really interested but worried that I might not have enough technical experience to give you the feedback you\'re after. Do I need to have an overly technical knowledge?',
				date: new Date(),
				upVotes: 2,
				downVotes: 1,
				author:{
					id: 1, 
					firstName: "Josh",
					lastName:  "Smith",
					handle: "jaysmith",
					at: "@",
					status: 'online',
					signature: Math.random()
				},
				replies: [
					{
						id: '1',
						reply:'Hey, I\'m really hoping to get a big range of people from all sorts of background. One of the key aims of this app is that it needs to be useable for anybody, even if they aren\'t totally tech-savvy so your feedback would be a huge help!',
						author:{
							id: 1, 
							firstName: "Katelin",
							lastName:  "Bull",
							handle: "katelinnz",
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
			src: '/img/placeholder/navigation.jpg',
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
			src: '/img/placeholder/mephobox.png',
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
			src: 'img/placeholder/ui-header.jpg',
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
