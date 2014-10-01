module.exports = {
	getAll: function(req, res) {
		User.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		User.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			res.serverError(err);
		});
	},

	getOneByHandle: function(req, res) {
		User.getOneHandle(req.param('handle'))
		.spread(function(model) {
			console.log(model);
			res.json(model);
		})
		.fail(function(err) {
			res.serverError(err);
		});
	},

	create: function (req, res) {
		var model = {
			handle: req.param('handle'),
			email: req.param('email'),
			firstName: req.param('firstName'),
			lastName: req.param('lastName')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	},
	update: function (req, res) {
		
		if(!req.user.id){
			return res.badRequest('Not Logged In');
		}
		//console.log(req);
		if(req.user.id != req.param('id')){
			return res.badRequest('Not Logged In');
		}
		
		console.log(req.params.all());

		User.update(req.user.id, req.params.all())
		.exec(function(err, model) {
			User.publishUpdate(req.user.id, model);
			return res.json(model);
		});
		
	},
	updateStatus: function (req, res) {
		
		if(req.user === "undefined" || !req.user.id ){
			return res.badRequest('Not Logged In');
		}
		if(req.user === "undefined" || (req.user.id != req.param('id'))){
			return res.badRequest('Not Logged In');
		}

		var id = req.user.id;
		
		if (!status) {
			return res.badRequest('No status provided.');
		}
		var status = req.param('status');
		var newModel = {
			id: id,
			status: status,
			statusTime: new Date()
		};

		User.update(id, newModel)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishUpdate(id, newModel);
				res.json(newModel);
			}
		});
	},
	autoCompleteTags: function (req, res) {
		
		var tag = req.param('tag');



		var tags = [
			'Designer',
			'Developer',
			'Frontend',
			'Backend'
		];

		res.send(tags);
	},
	getRecentCommits: function (req, res) {

		var github = new sails.GitHubApi({
	    	// required
	    	version: "3.0.0",
	    	// optional
	    	timeout: 5000
		});

		github.repos.getCommits({
		    user: "Symantis",
		    repo: "Symantis.org",
		    per_page: "20"

		}, function(err, data) {
		    //console.log(data);

		    res.json(data);
		});

	}

};