PropertyActions = {

	//lots of more stuff to add	
	property : {
		street       : String,
		price        : String,
		city         : String,
		state        : String,
		zip          : String,
		neighborhood : String,
		status       : String,
		details      : String,
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

		PropertiesCollection.insert


		PropertiesCollection.insert(property, function(err){
			if(err)
				throw new Meteor.Error('PropertiesActions.createProperty', err);
		});

		return property;
	},
}