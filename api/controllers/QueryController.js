/**
 * QueryController
 *
 * @description :: Server-side logic for managing queries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getLike: function(req, res) {
		Query.find({ title: { 'like': '%'+req.param('title')+'%' }})
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
		Query.getOne(req.param('id'))
		.spread(function(model) {
			Query.subscribe(req.socket, model);
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
			clean: req.param('title').replace(/[\s]/g, '-'),
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

