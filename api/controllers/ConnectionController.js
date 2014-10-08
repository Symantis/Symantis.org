/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAllForUser: function(req, res) {
		Connection.getAllForUser(req.param('id'))
		.spread(function(model) {
			Connection.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
			//res.serverError(err);
		});
	}
};

