/**
* Response.js
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
			via: 'responseVotes',
            dominant:true
		},
		/*
		voters: {
			collection: 'user',
			via: 'id'
		},
		*/
		solution: {
			type: 'boolean',
			defaultsTo: false
		},
		author: {
			model: 'user',
			required: true
		},
		date: {
			type: 'datetime',
			defaultsTo: new Date()
		},
		response: {
			type: 'string',
			required: true
		},
		replies: {
			collection: 'comment',
			via: 'response'
		},
		query: {
			model: 'query',
			required: true
		}
	},
	getAll: function() {
		return Response.find()
		.populate('author')
		.populate('replies')
		.then(function (models) {
			return [models];
		});
	},
	getOne: function(id) {
		return Response.findOne(id)
		.populate('author')
		.populate('replies')
		.then(function (model) {
			//model.totalViews = parseInt(model.totalViews) + 1;
			//Query.addViewCount(id);
			return [model];
		});
	},
	getAllForQuery: function(query) {
		console.log(query);
		return Response.find({query: query})
		.populate('author')
		.populate('replies')
		.then(function (models) {
			return [models];
		});
	},
	/*
	afterCreate : function(response, next){
  		//console.log(comment);
  		Response.findOne(response.id)
  		.populate('author')
  		.then(function(model){
  			Response.publishCreate(model);
  			return model;
  		});
  		//Response.publishCreate();

  		next();
  	}
  	*/
};

