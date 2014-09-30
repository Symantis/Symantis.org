angular.module( 'symantis.me', [
	'symantis.me.connections',
	'symantis.me.settings',
	'symantis.me.manti',
	'symantis.me.activity',
	'symantis.me.sykit'
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'me', {
			url: '/me',
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
				"subheader@me": {
					controller: 'MeHeaderCtrl',
                	templateUrl: 'me/header.tpl.html'
				},
				"leftside@profile": {
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
		.state( 'me.sykit', {
			url: '/sykit',
			views: {
				"main@": {
					controller: 'SykitCtrl',
					templateUrl: 'me/sykit/index.tpl.html'
				},
				"leftside@me.sykit": {
					controller: 'SykitLeftsideCtrl',
                	templateUrl: 'me/sykit/leftside.tpl.html'
				}
			}
		})
	;
})

.controller( 'MeCtrl', function ProfileController( $scope, titleService, $http, UserModel ) {
	titleService.setTitle('Me');
	
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