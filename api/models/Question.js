/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		votes: {
			type: 'integer',
			defaultsTo: 0
		},
		voters: {
			collection: 'user',
			via: 'handle'
		},
		/*
		voters: {
			collection: 'user',
			via: 'id'
		},
		*/
		author: {
			model: 'user',
			required: true
		},
		date: {
			type: 'datetime',
			defaultsTo: new Date()
		},
		question: {
			type: 'string',
			required: true
		},
		replies: {
			collection: 'comment',
			via: 'question',
			defaultsTo: []
		},
		opportunity: {
			model: 'opportunity',
			required: true
		}
	},
	getAll: function() {
		return Question.find()
		.populate('author')
		.populate('replies')
		.then(function (models) {
			return [models];
		});
	},
	getOne: function(id) {
		return Question.findOne(id)
		.populate('author')
		.populate('replies')
		.then(function (model) {
			//model.totalViews = parseInt(model.totalViews) + 1;
			//Query.addViewCount(id);
			return model;
		});
	}
};

