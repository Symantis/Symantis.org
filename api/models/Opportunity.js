/**
* Opportunity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		oid: {
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
		imgs: {
			type: 'array',
			defaultsTo: []
		},
		opportunity: {
			type: 'string',
			required: true
		},
  		edited: {
			type: 'boolean',
			defaultsTo: false
		},
		tags: {
			type: 'json',
			defaultsTo: []
		},
		questions: {
			collection: 'question',
			via: 'opportunity'
		},
		replies: {
			collection: 'comment',
			via: 'opportunity'
		}
	}
};

