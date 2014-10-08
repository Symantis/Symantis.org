module.exports = {
	getLike: function(req, res) {
		User.find({ handle: { 'contains': req.param('handle') }})
		.exec(function(err, users){
			if(err){

			}
			else{
				res.json(users);
			}
		});
	},
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
			User.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
			//res.serverError(err);
		});
	},
	getByHandle: function(req, res) {
		console.log(req.param('handle'));
		User.getByHandle(req.param('handle'))
		.spread(function(model) {
			User.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
			//res.serverError(err);
		});
	},

	create: function (req, res) {
		var model = {
			handle: req.param('username'),
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
	connect: function (req, res) {
		
		if(!req.user.id){
			return res.badRequest('Not Logged In');
		}
		//console.log(req);
		if(req.user.id != req.param('id')){
			return res.badRequest('Not Logged In');
		}
		if(!req.param('connect')){
			return res.badRequest('No Connection id');
		}
		var id = req.param('id');
		var connect = req.param('connect');

		Connection.create({to: connect, from: id }, function(err, connection){
			if(err){
				return console.log(err);
			}
			else{

				User.findOne(id)
				.exec(function(err, fromUser){
					// handle error
					if(err){

				 	} 

					// Queue up a record to be inserted into the join table
					fromUser.toConnections.add(connection.id);
					fromUser.save(console.log, function(err) {
				  		if(err){
					  		//console.log(err);
					  	}
					});

					fromUser.connections.add(connect);
					// Save the user, creating the new associations in the join table
					fromUser.save(console.log, function(err) {
				  		if(err){
					  		//console.log(err);
					  	}
					});
					User.publishAdd(id, 'connections', connect);
					User.publishUpdate(id, fromUser);
				});

				User.findOne(connect)
				.exec(function(err, toUser){
				   // handle error
					if(err){

					} 
					// Queue up a record to be inserted into the join table
					toUser.fromConnections.add(connection.id);
					toUser.save(console.log,function(err) {
					  	if(err){
					  		//console.log(err);
					  	}
					});
					toUser.connections.add(id);
					// Save the user, creating the new associations in the join table
					toUser.save(console.log,function(err) {
					  	if(err){
					  		//console.log(err);
					  	}
					});
					User.publishAdd(connect, 'connections', id);
					User.publishUpdate(id, toUser);
				});
			}

			console.log("associated "+id+" with "+connect);
			return res.json(connection);
		});
		/*
		User.findOne(req.param('id'))
		.exec(function(err, user){
			if(err){
				return res.badRequest('User not found');
			}
			else{
				
				user.connections.add(connect);
				user.save(console.log);
				User.publishAdd(id, 'connections', connect);
				//res.json(user);

				Connection.create({to: connect, from: id }, function(err, model){
					if(err){
						return console.log(err);
					}else{
						User.publishAdd(id, 'toConnections', connect);
						User.publishAdd(connect, 'fromConnections', id);
						
						res.json(model);
					}
				});
			}
		})
		*/
		/*
		User.update(req.user.id, req.params.all())
		.exec(function(err, model) {
			User.publishUpdate(req.user.id, model);
			return res.json(model);
		});
		*/
		
	},
	updateStatus: function (req, res) {
		
		if(!req.user ){
			return res.badRequest('Not Logged In');
		}
		if(req.user.id != req.param('id')){
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