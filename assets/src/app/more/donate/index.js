angular.module( 'symantis.more.donate', [
])

.config(function config( $stateProvider ) {
	/*
	$stateProvider.state( 'about', {
		url: '/about',
		views: {
			"main": {
				controller: 'AboutCtrl',
				templateUrl: 'about/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
                templateUrl: 'header/header.tpl.html'
			},
			"subheader@about": {
				controller: 'AboutHeaderCtrl',
                templateUrl: 'about/header.tpl.html'
			}
		}
	});
	*/
})

.controller( 'DonateCtrl', function DonateController( $scope, titleService ) {
	titleService.setTitle('Donate');

	$scope.$parent.toDo = ['Hook up Paypal','Create payment methods'];
})
.controller( 'DonateHeaderCtrl', function DonateHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'DonateLeftsideCtrl', function DonateLeftsideController( $scope ) {
	//titleService.setTitle('About');
});