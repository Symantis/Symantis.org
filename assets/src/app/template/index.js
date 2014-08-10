angular.module( 'symantis.template', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'template', {
		url: '/template',
		views: {
			"main": {
				controller: 'TemplateCtrl',
				templateUrl: 'template/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			}
		}
	});
})

.controller( 'TemplateCtrl', function TemplateController( $scope, titleService ) {
	titleService.setTitle('Template');
});