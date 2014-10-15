/**
 * ResponseController
 *
 * @description :: Server-side logic for managing responses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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

