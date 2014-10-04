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
		}
	}
};

