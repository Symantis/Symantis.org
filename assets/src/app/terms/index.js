angular.module( 'symantis.terms', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'terms', {
		url: '/terms',
		views: {
			"main": {
				controller: 'TermsCtrl',
				templateUrl: 'terms/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
				templateUrl: 'header/header.tpl.html'
			},
			"subheader@terms": {
				controller: 'TermsHeaderCtrl',
                templateUrl: 'terms/header.tpl.html'
			},
			"leftside@terms": {
				controller: 'TermsLeftsideCtrl',
                templateUrl: 'terms/leftside.tpl.html'
			}
		}
	});
})

.controller( 'TermsCtrl', function TermsController( $scope, titleService ) {
	titleService.setTitle('Terms');

	
})
.controller( 'TermsHeaderCtrl', function TermsHeaderController( $scope, titleService ) {
	//titleService.setTitle('Docs');

	
})
.controller( 'TermsLeftsideCtrl', function TermsLeftsideController( $scope ) {
	//titleService.setTitle('Docs');

	
});