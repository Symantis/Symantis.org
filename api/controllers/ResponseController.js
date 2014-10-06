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
};

