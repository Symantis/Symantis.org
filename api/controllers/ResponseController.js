/**
 * ResponseController
 *
 * @description :: Server-side logic for managing responses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findOne: function(req, res){
		Response.findOne(req.param('id'))
		.populate('author')
		.exec(function(err, response){
			if(err){

			}
			else{
				Response.subscribe(req.socket, response);
				res.json(response);
			}
		});
		/*
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// An error occured
			console.log(err);
		});
		*/
	},
	find: function(req, res){
		Response.find(req.params.all())
		.populate('author')
		.exec(function(err, responses){
			if(err){

			}
			else{
				Response.subscribe(req.socket, responses);
				res.json(responses);
			}
		});
		/*
		.spread(function(models) {
			res.json([models]);
		})
		.fail(function(err) {
			// An error occured
			console.log(err);
		});
	*/
	},
	getOne: function(req, res) {
		Response.getOne(req.param('id'))
		.spread(function(model) {
			Response.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
			//res.serverError(err);
		});
	},
	getAllForQuery: function(req, res) {
		//console.log(req.param('query'));
		Response.getAllForQuery(req.param('query'))
		.spread(function(models) {
			//console.log(models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},
	create: function (req, res) {
		var author = req.param('author');
		var model = {
			response: req.param('response'),
			query: req.param('query'),
			author: author
		};

		Response.create(model)

		.exec(function(err, response) {
			if (err) {
				return console.log(err);
			}
			else {
				response.author = author;
				Response.publishCreate(response);
				res.json(response);
			}
		});
	},
	
	update: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}
		model = req.params.all();
		Response.update(id, model)
		.exec(function(err, response) {
			if (err) {
				return console.log(err);
			}
			else {
				Response.publishUpdate(id, model);
				res.json(model);
			}
		});
	},

	addSolution: function(req, res){
		var query = req.param('query');
		if (!query) {
			return res.badRequest('No query id provided.');

		}
		var response = req.param('response');
		if (!response) {
			return res.badRequest('No response id provided.');
		}
		var user = req.param('user');
		if (!user) {
			return res.badRequest('No user id provided.');
		}
		Query.update(query, { solved: response })
		.exec(function(err, models) {
			if (err) {
				console.log(err);
			}
			else {
				Query.publishUpdate(query, models[0]);
				res.json(models[0]);
			}
		});

	},
	addReply: function (req, res){
		var query = req.param('query');
		if (!query) {
			return res.badRequest('No query id provided.');

		}
		var response = req.param('response');
		if (!response) {
			return res.badRequest('No response id provided.');

		}
		var author = req.param('author');
		if (!author) {
			return res.badRequest('No author id provided.');

		}
		var comment = req.param('comment');
		if (!comment) {
			return res.badRequest('No comment provided.');

		}

		var reply = {
			query: query,
			response: response,
			author: author,
			comment: comment,
			controller: 'query'
		}

		Comment.create(reply)
		.exec(function (err, newModel){
			if(err){

			}
			else{
				Comment.publishCreate(newModel);
				res.json(newModel);
			}
		});
	}
};

