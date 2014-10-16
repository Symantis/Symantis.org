angular.module( 'symantis.me.settings', [
])
/*
.config(function config( $stateProvider ) {
	$stateProvider.state( 'connections', {
		url: '/connections',
		views: {
			"main": {
				controller: 'ConnectionsCtrl',
				templateUrl: 'connections/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})
*/
.controller( 'MeSettingsCtrl', function MeSettingsController( $http, $scope, $rootScope, titleService, UserModel, user, cache ) {
	titleService.setTitle('My Settings');
	$scope.$parent.toDo = ['Hook up other Settings forms', 'Add save option to tags'];

	$scope.loadingSection = true;
	cache.resolveUserCache($rootScope.users, user.handle).then(function(user){
		$rootScope.user = user;
		//$rootScope.user.reciprocal = utils.findUserMatches($scope.user.toConnections, $scope.user.fromConnections ).length;
		$scope.loadingSection = false;
		
	});


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
.controller( 'MeSettingsLeftsideCtrl', function MeSettingsLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'MeSettingsAccountCtrl', function MeSettingsAccountController( $scope ) {

})
.controller( 'MeSettingsEmailsCtrl', function MeSettingsEmailsController( $scope ) {

})
.controller( 'MeSettingsNotificationsCtrl', function MeSettingsNotificationsController( $scope ) {

})
.controller( 'MeSettingsSecurityCtrl', function MeSettingsSecurityController( $scope ) {

})
.controller( 'MeSettingsMantiCtrl', function MeSettingsMantiController( $scope ) {

})
.controller( 'MeSettingsSykitCtrl', function MeSettingsSykitController( $scope ) {

})