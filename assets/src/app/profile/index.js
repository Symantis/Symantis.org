angular.module( 'symantis.profile', [
	'symantis.profile.connections',
	'symantis.profile.manti',
	'symantis.profile.activity',
	'symantis.profile.view'
])

.config(function config( $stateProvider ) {
	$stateProvider
		.state( 'profile', {
			url: '/@',
			resolve : {
			    users : function(UserModel) {
			        return UserModel.getAll();
			    },
			    user : function(){
			    	return {};
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
			    user : function($stateParams) {
			        return { handle: $stateParams.handle };
			        //return UserModel.getOneByHandle($stateParams.handle);
			    }
		    },
			views: {
				"main@": {
					controller: 'ProfileViewCtrl',
					templateUrl: 'profile/view/index.tpl.html',
					/*
					resolve : {
			            user : function(UserModel, $stateParams) {
			                //console.log($stateParams.id);
			               // var deferred = $q.defer();
			                //console.log($stateParams.handle);
			                return UserModel.getOneByHandle($stateParams.handle);
			                
			            }
		        	}
		        	*/
		        	
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
			views: {
				"main@": {
					controller: 'ProfileConnectionsCtrl',
					templateUrl: 'profile/connections/index.tpl.html'
				},
				"leftside@profile.connections": {
					controller: 'ProfileConnectionsLeftsideCtrl',
                	templateUrl: 'profile/connections/leftside.tpl.html'
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
				"leftside@profile.manti": {
					controller: 'ProfileMantiLeftsideCtrl',
                	templateUrl: 'profile/manti/leftside.tpl.html'
				}
			}
		})
		.state( 'profile.view.activity', {
			url: '/activity',
			views: {
				"main@": {
					controller: 'ProfileActivityCtrl',
					templateUrl: 'profile/activity/index.tpl.html'
				},
				"leftside@profile.activity": {
					controller: 'ProfileActivityLeftsideCtrl',
                	templateUrl: 'profile/activity/leftside.tpl.html'
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
		.state('profile.view.invite',{
			url: '/invite',
			views: {
				"profile@profile.view": {
					controller: 'ProfileInviteCtrl',
					templateUrl: 'profile/view/invite.tpl.html'
				}
			}
		})
		
	;
})

.controller( 'ProfileCtrl', function ProfileController( $scope, titleService, users ) {
	titleService.setTitle('Profile');
	$scope.users = users;

	
})
.controller( 'ProfileHeaderCtrl', function ProfileHeaderController( $scope, user) {
	$scope.user = user;

})
.controller( 'ProfileLeftsideCtrl', function ProfileLeftsideController( $scope ) {

});