angular.module( 'symantis.community', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'community', {
		url: '/community',
		views: {
			"main": {
				controller: 'CommunityCtrl',
				templateUrl: 'community/index.tpl.html'
			}
		}
	});
})

.controller( 'CommunityCtrl', function CommunityController( $scope, titleService ) {
	titleService.setTitle('Community');

	
});