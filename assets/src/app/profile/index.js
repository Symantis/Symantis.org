angular.module( 'symantis.profile', [
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
				}
			}
		})
		.state('profile.view',{
			url: '/:handle',
			views: {
				"main@": {
					controller: 'ProfileViewCtrl',
					templateUrl: 'profile/profile.tpl.html'
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
.controller( 'ProfileViewCtrl', function ProfileViewController($scope, titleService, $state, $stateParams) {
	
	
	$scope.user = {};

	for(var i in $scope.users){
		
		if($scope.users[i].handle == $stateParams.handle){
			
			$scope.user = $scope.users[i];
			console.log($scope.user);
			titleService.setTitle($scope.user.firstName+'\'s' + ' Profile');
			break;
		}
		console.log($stateParams.handle+' '+$scope.users[i].handle);
	}

});