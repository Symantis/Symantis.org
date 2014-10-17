/**
 * CreatorController
 *
 * @description :: Server-side logic for managing creators
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	subscribeToDemo: function(req, res) {
	  sails.sockets.join(req.socket, 'demo');
	  res.json({
	    message: 'Subscribed to a fun room called demo!'
	  });
	}
};

