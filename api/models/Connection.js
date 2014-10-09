/**
* Connection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		/*
		connection: {
			model: 'user'
		},
		*/
		to: {
			model: 'user'
		},
		from: {
			model: 'user'
		}
	},
	getAll: function() {
		return Connection.find()
		.populate('to')
		.populate('from')
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return Connection.findOne(id)
		.populate('to')
		.populate('from')
		.then(function (model) {
			return [model];
		});

	},
	getAllForUser: function(id) {
		return Connection.find({
		  or : [
		    { to: id },
		    { from: id }
		  ]
		})
		.populate('to')
		.populate('from')
		.then(function (models) {
			var reduced = [];
			_.each(models, function(model){
			 	//console.log("MODEL--");
			 	//console.log(model);
			 	if(model.to.id != id){
			 		reduced.push(model.to);
			 	}
			 	if(model.from.id != id){
			 		reduced.push(model.from);
			 	}
			});
			
			reduced = _.map(_.groupBy(reduced,function(doc){
					  return doc.id;
					}),function(grouped){
					  return grouped[0];
					});
			return [reduced];
		});
	}
};

