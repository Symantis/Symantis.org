angular.module( 'symantis.profile', [
	'symantis.profile.connections',
	'symantis.profile.manti',
	'symantis.profile.information',
	'symantis.profile.view'
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'profile', {
			url: '/@',
			resolve : {
			    users : function($rootScope) {
			        return $rootScope.users;
			    }
		    },
			views: {
				"main": {
					controller: 'ProfileCtrl',
					templateUrl: 'profile/index.tpl.html',
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
				"subheader@profile": {
					controller: 'ProfileHeaderCtrl',
                	templateUrl: 'profile/header.tpl.html'
				},
				"leftside@profile": {
					controller: 'ProfileLeftsideCtrl',
					templateUrl: 'profile/leftside.tpl.html'
				}
			}
		})
		
		.state('profile.view',{
			url: ':handle',
			resolve : {
				//cache: 'cache',
			    
			    user : function($rootScope, $stateParams) {
			        return {handle: $stateParams.handle};

			    },
			    
			    /*
			    user : function($stateParams, UserDS){
			    	return UserDS.find(
			    		{
				    		where: {
				    			handle : $stateParams.handle 
				    		}
			    		}
			    	);
			    },
			    */
			    users : function($rootScope){
			    	return $rootScope.users;
			    }
		    },
			views: {
				"main@": {
					controller: 'ProfileViewCtrl',
					templateUrl: 'profile/view/index.tpl.html',
				},
				"leftside@profile.view": {
					controller: 'ProfileViewLeftsideCtrl',
					templateUrl: 'profile/view/leftside.tpl.html'
				},
				"subheader@profile": {
					controller: 'ProfileHeaderCtrl',
                	templateUrl: 'profile/header.tpl.html'
				}
			}
		})
		.state( 'profile.view.connections', {
			url: '/connections',
			resolve : {
				//cache: 'cache',
			    user : function(cache, $rootScope, $stateParams) {
			        return {handle: $stateParams.handle};
			    },
			    users : function($rootScope){
			    	return $rootScope.users;
			    }
		    },
			views: {
				"main@": {
					controller: 'ProfileConnectionsCtrl',
					templateUrl: 'profile/connections/index.tpl.html'
				},
				"leftside@profile.view.connections": {
					controller: 'ProfileConnectionsLeftsideCtrl',
                	templateUrl: 'profile/connections/leftside.tpl.html'
				}
			}
		})
		.state( 'profile.view.information', {
			url: '/information',
			resolve : {
				//cache: 'cache',
			    user : function(cache, $rootScope, $stateParams) {
			        return {handle: $stateParams.handle};
			    },
			    users : function($rootScope){
			    	return $rootScope.users;
			    }
		    },
			views: {
				"main@": {
					controller: 'ProfileInformationCtrl',
					templateUrl: 'profile/information/index.tpl.html'
				},
				"leftside@profile.view.information": {
					controller: 'ProfileInformationLeftsideCtrl',
                	templateUrl: 'profile/information/leftside.tpl.html'
				}
			}
		})
		.state( 'profile.view.manti', {
			url: '/manti',
			views: {
				"main@": {
					controller: 'ProfileMantiCtrl',
					templateUrl: 'profile/manti/index.tpl.html'
				},
				"leftside@profile.view.manti": {
					controller: 'ProfileMantiLeftsideCtrl',
                	templateUrl: 'profile/manti/leftside.tpl.html'
				},
				"manti-nav@profile.view.manti": {
					controller: 'ProfileMantiNavCtrl',
                	templateUrl: 'profile/manti/sort.tpl.html'
				}
			}
		})
		.state( 'profile.view.manti.view', {
			url: '/:id/:title',
			resolve: {
				manti : function($stateParams) {
				    return { id: $stateParams.id, clean: $stateParams.title };
				}
			},
			views: {
				"manti@profile.view.manti": {
					controller: 'ProfileMantiViewCtrl',
					templateUrl: 'profile/manti/view.tpl.html'
				},
				"manti-nav@profile.view.manti": {
					controller: 'ProfileMantiNavCtrl',
                	templateUrl: 'common/back.tpl.html'
				}
			}
		})
		.state('profile.view.message',{
			url: '/message',
			views: {
				"profile@profile.view": {
					controller: 'ProfileMessageCtrl',
					templateUrl: 'profile/view/message.tpl.html'
				}
			}
		})
		.state('profile.view.connect',{
			url: '/connect',
			views: {
				"profile@profile.view": {
					controller: 'ProfileConnectCtrl',
					templateUrl: 'profile/view/connect.tpl.html'
				}
			}
		})
		
	;
})

.controller( 'ProfileCtrl', function ProfileController( $sails, $rootScope, titleService, users, UserDS) {
	titleService.setTitle('Profile');
	$scope.$parent.toDo = [];
	
	UserDS.findAll().then(function(){
		$scope.loadingSection = false;
		UserDS.bindAll($scope, 'users');	
	})
	//$scope.users = $rootScope.users;

	
})
.controller( 'ProfileHeaderCtrl', function ProfileHeaderController( $scope, user) {
	$scope.user = user;

})
.controller( 'ProfileLeftsideCtrl', function ProfileLeftsideController( $scope ) {

});