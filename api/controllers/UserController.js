module.exports = {
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
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	create: function (req, res) {
		var model = {
			handle: req.param('handle'),
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
	updateStatus: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}
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
	}
};