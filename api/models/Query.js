/**
* Query.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
  		qid: {
  			type: 'integer',
    		autoIncrement: true
  		},
  		title: {
  			type: 'string',
			required: true
		},
		clean: {
			type: 'string'
		},
		category: {
			collection: 'category',
			via: 'title'
		},
		tags: {
			type: 'json',
			defaultsTo: []
		},
		author:{
			model: 'user',
			required: true
		},
		bounty:{
			type: 'float',
			defaultsTo: 0.00
		},
		totalResponses: {
			type: 'integer',
			defaultsTo: 0
		},
		totalViews: {
			type: 'integer',
			defaultsTo: 0
		},
		imgs: {
			type: 'array',
			defaultsTo: []
		},
		query: {
			type: 'string',
			required: true
		},
		date: {
			type: 'datetime',
			defaultsTo: new Date()
		},
		solved: {
			type: 'boolean',
			defaultsTo: false
		},
		responses: {
			collection: 'response',
			via: 'query',
			defaultsTo: []
		}
		/*
		,
		viewers: {
			collection: 'views',
			via: 'user'
		}
		*/


	},
	getAll: function() {
		return Query.find()
		.populate('author')
		.populate('responses')
		.then(function (models) {
			_.each(models, function(model) { 
				model.totalResponses = model.responses.length;
				/*
				_.each(model.responses, function(response){
					response.author = User.findOne(author).exec(); 
				});
				*/
			});
			return [models];
		});
	},
	getOne: function(id) {
		return Query.findOne(id)
		//.populate('viewers')
		.populate('author')
		//.populate('responses')
		//.then(function(model){
			//console.log(model.responses);
			/*
			_.map(model.responses, function(response){
				//console.log(response);
				return response.author = User.findOne(response.author).then(function(user){
					return [user];
				});
				
			});
			//console.log(model.responses);
			model.totalResponses = model.responses.length;
			*/
			//return model;
		//})
		.then(function (model) {
			
			return [model];
		});
	},
	addViewCount: function(id){
		return Query.findOne(id)
		.then(function (model){
			//console.log(model.totalViews);
			model.totalViews = model.totalViews == null ? 1 : parseInt(model.totalViews) + 1;
			//console.log(model.totalViews);
			Query.update(id, {totalViews: model.totalViews})
			.exec(function (err, newModel){
				if(err){
					return console.log(err);
				}
				else{	
					Query.publishUpdate(model.id, { totalViews: model.totalViews });
				return;
				}
			});
		});
	},
	addResponseCount: function(id){
		return Query.findOne(id)
		.then(function (model){
			//console.log(model.totalViews);
			model.totalResponses = model.totalResponses == null ? 1 : parseInt(model.totalResponses) + 1;
			//console.log(model.totalViews);
			Query.update(id, {totalResponses: model.totalResponses})
			.exec(function (err, newModel){
				if(err){
					return console.log(err);
				}
				else{	
					Query.publishUpdate(model.id, { totalResponses: model.totalResponses });
				return;
				}
			});
		});
	}

};

