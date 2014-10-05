var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		uid: {
  			type: 'integer',
    		autoIncrement: true
  		},
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
			type: 'string',
			defaultsTo: new Date().getTime()
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
			defaultsTo: ""
		},
		professed: {
			type: 'string',
			defaultsTo: ""
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
		//TODO Collection or Tracker
		manti: {
			type: 'array',
			defaultsTo: []
		},
		//TODO Collection or Tracker
		contributions: {
			type: 'array',
			defaultsTo: []
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
		//.populate('connections')
		.then(function (model) {
			return [model];
		});
	},
	getOneByHandle: function(handle) {
		return User.findOne({ handle: handle })
		//.populate('connections')
		.then(function (model) {
			return [model];
		});
	}
};