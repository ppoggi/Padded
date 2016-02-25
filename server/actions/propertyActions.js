PropertyActions = {
	
	property : {
		street       : String,
		price        : String,
		city         : String,
		state        : String,
		zip          : String,		
		status       : String,
		details      : Array,
		img          : String,
		urlName      : String,
		urlLink      : String
	},

	checkProperty: function(options){	
		
		try{
			check(options, this.property);
		}catch(err){
			throw new Meteor.Error('PropertyActions.newProperty', 'Invalid property Check');
		}

		options.comments = [];

		return options;		
	},

	createProperty: function(userId, property, listId, property, callback){

		PropertiesCollection.insert(property, (err, id) => {
			if(err)
				throw new Meteor.Error('PropertyActions.createProperty', err);
		
			property._id = id;
			
			callback(userId, property, listId);
		})
	},
}
