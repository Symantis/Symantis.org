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
			type: 'int',
			defaultsTo: 0
		},
		totalViews: {
			type: 'int',
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
			via: 'rid'
		}


	},
	getAll: function() {
		return Query.find()
		.populate('author')
		.then(function (models) {
			return [models];
		});
	},
	getOne: function(id) {
		return Query.findOne(id)
		.populate('author')
		//.populate('responses')
		.then(function (model) {
			model.totalViews = model.totalViews + 1;
			Query.addViewCount(id, model.totalViews);
			return [model];
		});
	},
	addViewCount: function(id, views){
		//[model].totalViews = [model].totalViews++;
		//Query.addViewCount(id, [model].totalViews);
		console.log(views);
		Query.update(id, { totalViews: views })
		.exec(function(err, models){
			if (err) {
				return res.serverError(err);
			}
		});
		
	}
};

