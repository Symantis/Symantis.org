angular.module( 'symantis.more', [
	'symantis.more.donate',
	'symantis.more.contributors',
	'symantis.more.sykit'
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'more', {
			url: '/more',
			views: {
				"main": {
					controller: 'MoreCtrl',
					templateUrl: 'more/index.tpl.html'
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
				"subheader@more": {
					controller: 'MoreHeaderCtrl',
	                templateUrl: 'more/header.tpl.html'
				},
				"leftside@more": {
					controller: 'MoreLeftsideCtrl',
	                templateUrl: 'more/leftside.tpl.html'
				}
			}
		})
		.state( 'more.sykit', {
			url: '/sykit',
			views: {
				"main@": {
					controller: 'SykitCtrl',
					templateUrl: 'more/sykit/index.tpl.html'
				},
				"leftside@more.sykit": {
					controller: 'SykitLeftsideCtrl',
                	templateUrl: 'more/sykit/leftside.tpl.html'
				}
			}
		})
		.state( 'more.donate', {
			url: '/donate',
			views: {
				"main@": {
					controller: 'DonateCtrl',
					templateUrl: 'more/donate/index.tpl.html'
				},
				"leftside@more.donate": {
					controller: 'DonateLeftsideCtrl',
                	templateUrl: 'more/donate/leftside.tpl.html'
				}
			}
		})
		.state( 'more.contributors', {
			url: '/contributors',
			views: {
				"main@": {
					controller: 'ContributorsCtrl',
					templateUrl: 'more/contributors/index.tpl.html',
					
				},
				"board@more.contributors":{
					controller: 'ContributorsBoardCtrl',
					templateUrl: 'more/contributors/board.tpl.html',
					
					resolve : {
			            commits : function(SystemModel, $q) {
			            	var deferred = $q.defer();

			            	/*
			                return SystemModel.getRecentCommits().then(function (data) {
                   					return data;
               				});
							*/
							/*
							SystemModel.getRecentCommits().then(function (data) {
                   				deferred.resolve(data);
                   			});
							*/
							//return deferred.promise;
			            }
		        	}
		        	
				},
				"leftside@more.contributors": {
					controller: 'ContributorsLeftsideCtrl',
                	templateUrl: 'more/contributors/leftside.tpl.html'
				}
			}
		})
	;
})

.controller( 'MoreCtrl', function MoreController( $scope, titleService ) {
	titleService.setTitle('More');
})
.controller( 'MoreHeaderCtrl', function MoreHeaderController( $scope, titleService ) {
	//titleService.setTitle('About');
})
.controller( 'MoreLeftsideCtrl', function MoreLeftsideController( $scope ) {
	//titleService.setTitle('About');
});