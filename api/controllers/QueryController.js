/**
 * QueryController
 *
 * @description :: Server-side logic for managing queries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');

module.exports = {
	getLike: function(req, res) {
		Query
		.find({ title: { 'like': '%'+req.param('title')+'%' }})
		.populate('author')
		.exec(function(err,queries){
			if(err){

			}
			else{
				res.json(queries);
			}
		});
	},
	getAll: function(req, res) {
		Query.getAll()
		.spread(function(models) {
			Query.watch(req);
			Query.subscribe(req.socket, models);

			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Q.all([
	    	// let's get the query
	    	Query.findOne(req.param('id'))
	    	.populate('author')
	    	.then(function (model) {
				return model;
			}),

	    	// let's get the responses
	    	Response.find({query: req.param('id')})
	    	.populate('author')
	    	.then(function (models) {
				return models;
			}),

			Comment.find({query: req.param('id')})
	    	.populate('author')
	    	.then(function (models) {
				return models;
			})

	    ])
		.spread(function(query, responses, replies) {
			
			
			query.totalResponses = responses.length;
			responses.totalReplies = replies.length;
			responses.replies = [];


			Query.subscribe(req.socket, query);
			Response.subscribe(req.socket, responses);
			Comment.subscribe(req.socket, replies);
			/*
			var model = query;
			model.responses = responses;
			model.totalResponses = responses.length;
			*/
			model = {
				query: query,
				responses: responses,
				replies: replies
			}

			//console.log(model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var author = req.param('author');
		
		var model = {
			title: req.param('title'),
			clean: escape(req.param('title')).replace('%20','-'),
			query: req.param('query'),
			tags: req.param('tags'),
			author: author
		};

		Query.create(model)
		.exec(function(err, query) {
			if (err) {
				return console.log(err);
			}
			else {
				Query.publishCreate(query);
				res.json(query);
			}
		});
	},
	update: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}
		
		var model = {
			title: req.param('title'),
			clean: escape(req.param('title')).replace('%20','-'),
			query: req.param('query'),
			tags: req.param('tags')
		}

		Query.update(id, model)
		.exec(function(err, query) {
			if (err) {
				return console.log(err);
			}
			else {
				Query.publishUpdate(id, model);
				res.json(model);
			}
		});

	},
	updateViews: function (req, res) {
		Query.addViewCount(req.param('id'));
		res.send(200);
		/*
		Query.findOne(req.param('id'))
		.exec(function( err, model ){
			if(err){

			}
			else{
				Query.addViewCount(model.id, model.totalViews);
				res.send(200);
			}
		});
		*/
	},
	addResponse: function (req, res){
		var id = req.param('query');
		if (!id) {
			return res.badRequest('No query id provided.');

		}
		var author = req.param('author');
		if (!author) {
			return res.badRequest('No author id provided.');

		}
		var response = {
			query: id,
			author: author,
			response: req.param('response')
		}
		Response.create(response)
		.exec(function (err, newModel){
			if(err){

			}
			else{
				Response.publishCreate(newModel);
				res.json(newModel);
			}
		});
		/*
		Query.addResponse({id: id, response: response }, function(err, newModel){
			if(err){
				return console.log(err);
			}
			else{
				res.json(model);
			}
		});
		*/
	},
	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Query.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Query.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Query.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}	
};

