/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findOne: function(req, res){
		Comment.findOne(req.param('id'))
		.populate('author')
		.exec(function(err, comment){
			if(err){

			}
			else{
				Comment.subscribe(req.socket, comment);
				res.json(comment);
			}
		});
	},
	find: function(req, res){
		Comment.find(req.params.all())
		.populate('author')
		.exec(function(err, comments){
			if(err){

			}
			else{
				Comment.subscribe(req.socket, comments);
				res.json(comments);
			}
		});
	},
	getOne: function(req, res) {
		Comment.getOne(req.param('id'))
		.spread(function(model) {
			Comment.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
			//res.serverError(err);
		});
	},
	create: function (req, res) {
		var author = req.param('author');
		var model = req.params.all();

		Comment.create(model)
		.exec(function(err, comment) {
			if (err) {
				return console.log(err);
			}
			else {
				comment.author = author;
				Comment.publishCreate(comment);
				res.json(comment);
			}
		});
	},
	
	update: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}
		model = req.params.all();
		Comment.update(id, model)
		.exec(function(err, comment) {
			if (err) {
				return console.log(err);
			}
			else {
				Comment.publishUpdate(id, model);
				res.json(model);
			}
		});
	},	
};

