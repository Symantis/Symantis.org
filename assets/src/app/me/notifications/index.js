angular.module( 'symantis.me.notifications', [
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
.controller( 'NotificationsCtrl', function MantiController( $scope, titleService ) {
	titleService.setTitle('My Notifications');

	
})
.controller( 'MeNotificationsLeftsideCtrl', function MeNotificationsLeftsideController( $scope ) {
	//titleService.setTitle('About');
})
.controller( 'MeNotificationsLeftsideCtrl', function MeNotificationsLeftsideController( $scope ) {
	//titleService.setTitle('About');
});