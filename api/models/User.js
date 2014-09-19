var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		handle: {
			type: 'string',
			required: true,
			unique: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		},
		getFullName: function (){
      		return this.firstName + ' ' + this.lastName;
    	},
		at : {
			type: 'string',
			defaultsTo: '@'
		},
		signature : {
			type: 'string'
		},
		status : {
			type: 'string',
			defaultsTo: 'offline'
		},
		statusTime: {
			type: 'datetime',
			defaultsTo: new Date()
		},
		tags : {
			type: 'array',
			defaultsTo : []
		},
		bio : {
			type: 'string',
			defaultsTo: null
		},
		professed: {
			type: 'string',
			defaultsTo: null
		},
		message_count: {
			type: 'number'
		},
		// A User can have many messages
		messages: {
			collection: 'message',
			via: 'user'
		},
		
		connections: {
			collection: 'user',
			via: 'id'
		},
		
		passports : { 
			collection: 'Passport', 
			via: 'user' 
		}
	},

	getAll: function() {
		return User.find()
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.then(function (model) {
			return [model];
		});
	}
};