module.exports = {
	index: function(req, res) {
		var navItems = [
			
			{url: '/messages', cssClass: 'fa fa-comments', title: 'Messages'},
			{url: '/about', cssClass: 'fa fa-infoc-circle', title: 'About'}
		
		];

		if (req.isAuthenticated()) {
			navItems.push({url: '/logout', cssClass: 'fa fa-comments', title: 'Logout'});

			User.update({id: req.user.id}, {status: 'active', statusTime: new Date() }).exec(function(err, user) {
			
			});
		}
		else {
			
			navItems.push({url: '/register', cssClass: 'fa fa-briefcase', title: 'Register'});
			navItems.push({url: '/login', cssClass: 'fa fa-comments', title: 'Login'});
		}

		console.log(req.user);

		res.view({
			title: 'Home',
			navItems: navItems,
			currentUser: req.user
		});
	}
};