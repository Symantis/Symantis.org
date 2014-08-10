angular.module( 'symantis.chat', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'chat', {
		url: '/chat',
		views: {
			"main": {
				controller: 'ChatCtrl',
				templateUrl: 'chat/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})

.controller( 'ChatCtrl', function ChatController( $scope, titleService ) {
	titleService.setTitle('Chat');

	
});