PropertyActions = {

	//lots of more stuff to add	
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
			
		return options;		
	},

	createProperty: function(options){		
		
		var property = this.newProperty(options);
		
		PropertiesCollection.upsert( property,  property, function(err){
			if(err)
				throw new Meteor.Error('PropertiesActions.createProperty', err);
		});

		return property;
	},
}
