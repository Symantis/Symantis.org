angular.module( 'symantis.me.activity', [
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
.controller( 'ActivityCtrl', function ActivityController( $scope, titleService ) {
	titleService.setTitle('My Activity');
	$scope.$parent.toDo = [];
	
})
.controller( 'MeActivityLeftsideCtrl', function MeActivityLeftsideController( $scope ) {
	//titleService.setTitle('About');
});