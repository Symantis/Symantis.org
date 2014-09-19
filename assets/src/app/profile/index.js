angular.module( 'symantis.profile', [
	'symantis.profile.view',
	'symantis.profile.find',
	'symantis.profile.suggested'
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'profile', {
			url: '/profile',
			views: {
				"main": {
					controller: 'ProfileCtrl',
					templateUrl: 'profile/index.tpl.html'
				},
				"sitenav": {
					controller: 'SiteNavCtrl',
	                templateUrl: 'sitenav/index.tpl.html'
				},
				"header": {
					controller: 'HeaderCtrl',
	                templateUrl: 'header/header.tpl.html'
				},
				"subheader@profile": {
					controller: 'ProfileHeaderCtrl',
                	templateUrl: 'profile/header.tpl.html'
				},
				"leftside@profile": {
					controller: 'ProfileLeftsideCtrl',
					templateUrl: 'profile/leftside.tpl.html'
				}
			}
		})
		.state( 'profile.find', {
			url: '/find',
			views: {
				"main@": {
					controller: 'ProfileFindCtrl',
					templateUrl: 'profile/find/index.tpl.html'
				},
				"leftside@profile.find": {
					controller: 'ProfileFindLeftsideCtrl',
                	templateUrl: 'profile/find/leftside.tpl.html'
				}
			}
		})
		.state( 'profile.suggested', {
			url: '/suggested',
			views: {
				"main@": {
					controller: 'ProfileSuggestedCtrl',
					templateUrl: 'profile/suggested/index.tpl.html'
				},
				"leftside@profile.suggested": {
					controller: 'ProfileSuggestedLeftsideCtrl',
                	templateUrl: 'profile/suggested/leftside.tpl.html'
				}
			}
		})
		.state('profile.view',{
			url: '/:handle',
			views: {
				"main@": {
					controller: 'ProfileViewCtrl',
					templateUrl: 'profile/view/index.tpl.html'
				},
				"leftside@profile.view": {
					controller: 'ProfileViewLeftsideCtrl',
					templateUrl: 'profile/view/leftside.tpl.html'
				}
			}
		})
		.state('profile.view.message',{
			url: '/message',
			views: {
				"profile@profile.view": {
					controller: 'ProfileMessageCtrl',
					templateUrl: 'profile/view/message.tpl.html'
				}
			}
		})
		.state('profile.view.connect',{
			url: '/connect',
			views: {
				"profile@profile.view": {
					controller: 'ProfileConnectCtrl',
					templateUrl: 'profile/view/connect.tpl.html'
				}
			}
		})
		.state('profile.view.invite',{
			url: '/invite',
			views: {
				"profile@profile.view": {
					controller: 'ProfileInviteCtrl',
					templateUrl: 'profile/view/invite.tpl.html'
				}
			}
		})
		
	;
})

.controller( 'ProfileCtrl', function ProfileController( $scope, titleService ) {
	titleService.setTitle('Profile');

	
})
.controller( 'ProfileHeaderCtrl', function ProfileHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'ProfileLeftsideCtrl', function ProfileLeftsideController( $scope ) {
	//titleService.setTitle('About');
});