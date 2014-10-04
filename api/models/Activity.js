/**
* Activity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
  		user:{
			model: 'user',
			required: true
		},
		message:{
			type: 'string',
			required: true
		},
  		controller: {
			type: 'string',
			enum: ['user', 'article', 'query', 'opportunity']
		},
		controllerId: {
			type: 'string',
			required: true
		}
	}
};

