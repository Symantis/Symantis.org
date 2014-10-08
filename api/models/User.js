var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		handle: {
			type: 'string',
			required: true,
			unique: true,
			index: true
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
			via: 'connections'
		},
		toConnections: {
			collection: 'connection',
			via: 'to'
		},
		fromConnections: {
			collection: 'connection',
			via: 'from'
		},
		activity: {
			collection: 'activity',
			via: 'user'
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
		.populate('connections')
		.populate('toConnections')
		.populate('fromConnections')
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.populate('connections')
		.populate('toConnections')
		.populate('fromConnections')
		.then(function (model) {
			model.totalToConnections = model.toConnections.length;
			model.totalFromConnections = model.fromConnections.length;
			model.totalConnections = model.totalToConnections + model.totalFromConnections;
			return [model];
		});

	},
	getByHandle: function(handle) {
		return User.findOne({ handle: handle })
		.populate('connections')
		.populate('toConnections')
		.populate('fromConnections')
		.then(function(model){
			console.log(model.connections);
			return model;
		})
		.then(function (model) {
			model.totalToConnections = model.toConnections.length;
			model.totalFromConnections = model.fromConnections.length;
			model.totalConnections = model.totalToConnections + model.totalFromConnections;
			return [model];
		});
	}
};