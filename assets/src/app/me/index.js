angular.module( 'symantis.me', [
	'symantis.me.connections',
	'symantis.me.settings',
	'symantis.me.manti',
	'symantis.me.activity'
])

.config(function config($stateProvider, $urlRouterProvider ) {
	
	//$urlRouterProvider.when('/*me', '/login');	

	$stateProvider
		.state( 'me', {
			url: '/me',
			resolve : {
				cache: 'cache',
			    
			    user : function(cache, $rootScope) {
			        return $rootScope.user = cache.resolveUserCache($rootScope.users, $rootScope.currentUser.handle);
			    }
		    },
			views: {
				"main": {
					controller: 'MeCtrl',
					templateUrl: 'me/index.tpl.html'
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
				"subheader@me": {
					controller: 'MeHeaderCtrl',
                	templateUrl: 'me/header.tpl.html'
				},
				"leftside@me": {
					controller: 'MeLeftsideCtrl',
					templateUrl: 'me/leftside.tpl.html'
				}
			}
		})
		.state( 'me.connections', {
			url: '/connections',
			views: {
				"main@": {
					controller: 'ConnectionsCtrl',
					templateUrl: 'me/connections/index.tpl.html'
				},
				"leftside@me.connections": {
					controller: 'MeConnectionsLeftsideCtrl',
                	templateUrl: 'me/connections/leftside.tpl.html'
				}
			}
		})
		.state( 'me.manti', {
			url: '/manti',
			views: {
				"main@": {
					controller: 'MantiCtrl',
					templateUrl: 'me/manti/index.tpl.html'
				},
				"leftside@me.manti": {
					controller: 'MeMantiLeftsideCtrl',
                	templateUrl: 'me/manti/leftside.tpl.html'
				}
			}
		})
		.state( 'me.settings', {
			url: '/settings',
			views: {
				"main@": {
					controller: 'MeSettingsCtrl',
					templateUrl: 'me/settings/index.tpl.html'
				},
				"leftside@me.settings": {
					controller: 'MeSettingsLeftsideCtrl',
                	templateUrl: 'me/settings/leftside.tpl.html'
				}
			}
		})
		.state('me.settings.account',{
			url: '/account',
			views: {
				"settings@me.settings": {
					controller: 'MeSettingsAccountCtrl',
					templateUrl: 'me/settings/account.tpl.html'
				}
			}
		})
		.state('me.settings.emails',{
			url: '/emails',
			views: {
				"settings@me.settings": {
					controller: 'MeSettingsEmailsCtrl',
					templateUrl: 'me/settings/emails.tpl.html'
				}
			}
		})
		.state('me.settings.notifications',{
			url: '/notifications',
			views: {
				"settings@me.settings": {
					controller: 'MeSettingsNotificationsCtrl',
					templateUrl: 'me/settings/notifications.tpl.html'
				}
			}
		})
		.state('me.settings.security',{
			url: '/security',
			views: {
				"settings@me.settings": {
					controller: 'MeSettingsSecurityCtrl',
					templateUrl: 'me/settings/security.tpl.html'
				}
			}
		})
		.state('me.settings.manti',{
			url: '/manti',
			views: {
				"settings@me.settings": {
					controller: 'MeSettingsMantiCtrl',
					templateUrl: 'me/settings/manti.tpl.html'
				}
			}
		})
		.state('me.settings.sykit',{
			url: '/sykit',
			views: {
				"settings@me.settings": {
					controller: 'MeSettingsSykitCtrl',
					templateUrl: 'me/settings/sykit.tpl.html'
				}
			}
		})
		.state( 'me.activity', {
			url: '/activity',
			views: {
				"main@": {
					controller: 'ActivityCtrl',
					templateUrl: 'me/activity/index.tpl.html'
				},
				"leftside@me.activity": {
					controller: 'MeActivityLeftsideCtrl',
                	templateUrl: 'me/activity/leftside.tpl.html'
				}
			}
		})
	;
})

.controller( 'MeCtrl', function ProfileController( $scope, titleService, $http, user, UserModel, utils ) {
	titleService.setTitle('Me');
	$scope.$parent.toDo = [];
	
	$scope.user = user;
	$scope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;

	$scope.loadTags = function(query) {
		return $http.get('/api/tags/' + query);
	};

	$scope.updateUser = function (){
		console.log($scope.currentUser);
		UserModel.update($scope.currentUser)
		.then(function(model){
			console.log(model);
		});
	
	}

	
})
.controller( 'MeHeaderCtrl', function MeHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'MeLeftsideCtrl', function MeLeftsideController( $scope ) {
	//titleService.setTitle('About');
});