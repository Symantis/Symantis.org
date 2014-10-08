angular.module( 'symantis.me.information', [
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
.controller( 'InformationCtrl', function InformationController( $scope, titleService ) {
	titleService.setTitle('My Information');
	$scope.$parent.toDo = [];
	
})
.controller( 'MeInformationLeftsideCtrl', function MeInformationLeftsideController( $scope ) {
	//titleService.setTitle('About');
});