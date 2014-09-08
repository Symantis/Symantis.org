angular.module( 'symantis.profile', ['symantis.profile.view'
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