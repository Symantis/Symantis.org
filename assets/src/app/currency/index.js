angular.module( 'symantis.currency', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'currency', {
		url: '/currency',
		views: {
			"main": {
				controller: 'CurrencyCtrl',
				templateUrl: 'currency/index.tpl.html'
			},
			"sitenav": {
				controller: 'SiteNavCtrl',
                templateUrl: 'sitenav/index.tpl.html'
			},
			"header": {
				controller: 'HeaderCtrl',
				templateUrl: 'header/header.tpl.html'
			},
			"footer": {
				controller: 'FooterCtrl',
				templateUrl: 'footer/index.tpl.html'
			},
			"subheader@currency": {
				controller: 'CurrencyHeaderCtrl',
                templateUrl: 'currency/header.tpl.html'
			},
			"leftside@currency": {
				controller: 'CurrencyLeftsideCtrl',
                templateUrl: 'currency/leftside.tpl.html'
			}
		}
	});
})

.controller( 'CurrencyCtrl', function CurrencyController( $scope, titleService ) {
	titleService.setTitle('Currency');
	$scope.$parent.toDo = ['Add Statement'];
	
})
.controller( 'CurrencyHeaderCtrl', function CurrencyHeaderController( $scope, titleService ) {
	//titleService.setTitle('Docs');

	
})
.controller( 'CurrencyLeftsideCtrl', function CurrencyLeftsideController( $scope ) {
	//titleService.setTitle('Docs');

	
});