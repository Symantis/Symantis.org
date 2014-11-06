/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Q = require('q');

module.exports = {
	checkEmail: function(req, res){
		var ret = { unique: false }
		User.findOne({ email: req.param('email') })
		.exec(function(err, user){
			if(err){
				res.json(ret);
			}
			else{
				if(user){
					ret.unique = false;
					res.json(ret);
				}else{
					ret.unique = true;
					res.json(ret);
				}
				
			}
		});
	},
	checkHandle: function(req, res){
		User.findOne({ handle: req.param('handle') })
		.exec(function(err, user){
			var ret = { unique: false }
			if(err){
				res.json(ret);
			}
			else{
				if(user){
					ret.unique = false;
					res.json(ret);
				}else{
					ret.unique = true;
					res.json(ret);
				}
				
			}
		});
	},
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

	findOne: function(req, res){
		console.log(req.params.all());
		User.findOne(req.param('id'))
		.populate('activity')
		//.populate('toConnections')
		//.populate('fromConnections')
		.spread(function(model) {
			console.log(model);
			res.json(model);
		})
		.fail(function(err) {
			// An error occured
			console.log(err);
		});
	},
	find: function(req, res){
		console.log(req.params.all());
		User.find(req.params.all())
		.populate('activity')
		//.populate('toConnections')
		//.populate('fromConnections')
		.spread(function(models) {
			res.json([models]);
		})
		.fail(function(err) {
			// An error occured
			console.log(err);
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
			console.log(err);
			res.send(404);
			//res.serverError(err);
		});
	},
	getByHandle: function(req, res) {
		//console.log(req.param('handle'));
		//User.getByHandle(req.param('handle'))
		Q.all([
			User.findOne({ handle: req.param('handle') })
			//.populate('connections')
			.populate('toConnections')
			.populate('fromConnections')
			.then(function(model){
				
				var reducedTo = [];
				_.each(model.toConnections, function(tos){
				 	if(tos.from != model.id){
				 		reducedTo.push(tos.from);
				 	}
				});
				var reducedFrom = [];
				_.each(model.fromConnections, function(froms){
				 	if(froms.to != model.id){
				 		reducedFrom.push(froms.to);
				 	}
				});

				//console.log(model.toConnections);
				//console.log(model.fromConnections);


				reducedFrom = _.unique(reducedFrom);
				reducedTo = _.unique(reducedTo);

				console.log(reducedFrom);
				console.log(reducedTo);
				
				var totalReciprocal = Math.abs(reducedTo.length - reducedFrom.length);
				
				model.totalReciprocal = totalReciprocal;

				var totalConnections = _.union(reducedFrom, reducedTo).length;
				model.totalConnections = totalConnections;

				model.totalFromConnections = Math.abs(totalReciprocal - reducedTo.length);
				model.totalToConnections = Math.abs(totalReciprocal - reducedFrom.length);
				
				
				//console.log(model.toConnections);
				//console.log(model.fromConnections);
				/*
				var totalToConnections = model.toConnections.length;
				var totalFromConnections = model.fromConnections.length;
				var totalReciprocal = totalToConnections > totalFromConnections ?  totalToConnections - totalFromConnections : totalFromConnections - totalToConnections;
				model.totalReciprocal = totalReciprocal;
				
				model.totalToConnections = _.difference(reducedTo, reducedFrom).length;
				model.totalFromConnections = _.difference(reducedFrom, reducedTo).length;;
				//model.totalToConnections = Math.max(0,totalToConnections - totalReciprocal);
				//model.totalFromConnections = Math.max(0,totalFromConnections - totalReciprocal);
				model.totalConnections = model.totalToConnections + model.totalFromConnections + model.totalReciprocal;
				*/
				return model;
			})
		])
		.spread(function(model) {
			User.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			console.log(err);
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
		.exec(function(err, models) {

			User.publishUpdate(req.user.id, req.params.all());
			return res.json(req.params.all());
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
					//fromUser.connections.add(connect);
					fromUser.toConnections.add(connect);
					fromUser.save(console.log, function(err) {
				  		if(err){
					  		//console.log(err);
					  	}
					});
					User.publishAdd(id, 'toConnections', connect);
					//User.publishUpdate(id, fromUser);
				});

				User.findOne(connect)
				.exec(function(err, toUser){
				   // handle error
					if(err){

					} 
					// Queue up a record to be inserted into the join table
					//toUser.connections.add(id);
					toUser.fromConnections.add(id);
					toUser.save(console.log,function(err) {
					  	if(err){
					  		//console.log(err);
					  	}
					});
					
					User.publishAdd(connect, 'fromConnections', id);
					//User.publishUpdate(id, toUser);
				});
			}

			console.log("associated "+id+" with "+connect);
			return res.json(connection);
		});
	},
	updateStatus: function (req, res) {
		
		if(!req.user ){
			return res.badRequest('Not Logged In');
		}
		if(req.user.id != req.param('id')){
			return res.badRequest('Not Logged In');
		}

		var id = req.user.id;
		
		var status = req.param('status');
		if (!status) {
			return res.badRequest('No status provided.');
		}

		var newModel = {
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