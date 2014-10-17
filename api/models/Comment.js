/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		comment: {
			type: 'string'
		},
		author: {
			model: 'user',
			required: true
		},
		date: {
			type: 'datetime',
			defaultsTo: new Date()
		},
		upVotes: {
			type: 'int',
			defaultsTo: 0
		},
		downVotes: {
			type: 'int',
			defaultsTo: 0
		},
		controller: {
			type: 'string',
			enum: ['article', 'query', 'opportunity']
		},
		query: {
			model: 'query'
		},
		response: {
			model: 'response' 
		},
		opportunity: {
			model: 'opportunity'
		},
		question: {
			model: 'question'
		}

	},
	getAll: function() {
		return Comment.find()
		.populate('author')
		.then(function (models) {
			return [models];
		});
	},
	getOne: function(id) {
		return Comment.findOne(id)
		.populate('author')
		.then(function (model) {
			//model.totalViews = parseInt(model.totalViews) + 1;
			//Query.addViewCount(id);
			return [model];
		});
	},
	/*
	afterCreate : function(comment, next){
  		//console.log(comment);
  		Comment.findOne(comment.id)
  		.populate('author')
  		.then(function(model){
  			Comment.publishCreate(model);
  			return model;
  		});
  		//Response.publishCreate();

  		next();
  	}
  	*/
};

