module.exports = {
	index: function(req, res) {
		var navItems = [
			
			{url: '/messages', sref: 'messages', title: 'Messages'},
			{url: '/about', sref: 'about', title: 'About'}
		
		];
		var isAuthenticated = req.isAuthenticated();

		if (isAuthenticated) {
			navItems.push({url: '/logout', sref: 'logout', title: 'Logout'});
			
			var UserModel = {
				status: 'active',
				statusTime: new Date()
			}
			
			User.update({id: req.user.id}, UserModel )
			.exec(function(err, user) {
				if(err){

				}
				else{
					req.user.status = UserModel.status;
					req.user.statusTime = UserModel.statusTime;
					User.publishUpdate(req.user.id, UserModel);
				}
			});

			console.log(req.user);
		}
		else {
			
			navItems.push({url: '/register', title: 'Register'});
			navItems.push({url: '/login', title: 'Login'});
		}

		if(!AccessService.checkAccessArea(isAuthenticated, req.route)){
			res.redirect('/login');
		}

		res.view({
			title: 'Home',
			navItems: navItems,
			currentUser: req.user
		});
	}
};