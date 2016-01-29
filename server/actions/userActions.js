Accounts.onCreateUser(function(options, user){
	
	UserActions.initialize(options, user);

	return user;
});

UserActions = {

	newDash: function(user){

		var dash = {};
		dash.owner = user._id;
		dash.userName = user.username;		
		dash.email = "";
		dash.properties = [];
		dash.realtors = [];
		dash.dateOfBirth = "";
		dash.gender = "";

		return dash;	
	},

	createDash: function(user){

		var dash = this.newDash(user);
		UserDash.insert(dash);			
	},

	createHistory: function(user){
		var history = {};
		history.owner = user._id
		history.removed = [];
		history.approved = [];

		UserHistory.insert(history, function(err){
			if(err)
				throw new Meteor.Error('UserActions.createHistory', err);
		})
	},

	initialize: function(options, user){
		
		this.createDash(user);
		this.createHistory(user);
	},

	updateDash: function(userId, property){
		
		PropertiesCollection.insert(property, (err,id)=>{

			if(err)
				throw new Meteor.Error('UserActions.updateDash.insertProperty',err);			

			property._id = id;

			UserDash.upsert( {owner:userId}, {$push:{properties: property }} , function(err){
				if(err)
					throw new Meteor.Error('UserActions.updateDash.upsertUserDash',err);
			});

		});				
	}

}
