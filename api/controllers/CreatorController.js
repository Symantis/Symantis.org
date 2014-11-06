/**
 * CreatorController
 *
 * @description :: Server-side logic for managing creators
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	subscribeToDemo: function(req, res) {
	  console.log("Joined");
	  sails.sockets.join(req.socket, 'demo');
	  console.log(sails.sockets.subscribers('demo'));
	  res.json({
	    message: 'Subscribed to a creator room called demo!'
	  });
	},

	dragBlock: function(req, res) {
	  console.log("Drag");
	  console.log(req.params.all());
	  var id = req.param('id');
	  var sizeX = req.param('sizeX');
	  var sizeY = req.param('sizeY');
	  var row = req.param('row');
	  var col = req.param('col');

	  var model = {
	  	id: id,
	  	sizeX: sizeX,
	  	sizeY: sizeY,
	  	row: row,
	  	col: col
	  }
	  sails.sockets.blast('drag', model);
	  sails.sockets.broadcast('demo','drag', model);
	  res.json(model);
	},
	resizeBlock: function(req, res) {
	  console.log("Resize");
	  console.log(req.params.all());
	  var id = req.param('id');
	  var sizeX = req.param('sizeX');
	  var sizeY = req.param('sizeY');
	  var row = req.param('row');
	  var col = req.param('col');

	  var model = {
	  	id: id,
	  	sizeX: sizeX,
	  	sizeY: sizeY,
	  	row: row,
	  	col: col
	  }

	  sails.sockets.blast('drag', model);
	  sails.sockets.broadcast('demo', 'resize', model);
	  
	  res.json(model);
	}
};

