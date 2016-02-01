Accounts.onCreateUser(function(options, user){
	
	UserActions.initialize(options, user);

	return user;
});

UserActions = {

	newDash: function(user){

		var dash         = {};
		dash.owner 	     = user._id;
		dash.userName    = user.username;		
		dash.email       = "";
		dash.list0       = [];
		dash.list1       = [];
		dash.list2       = [];
		dash.list3       = [];
		dash.list4       = [];
		dash.listNames   = ["Untitled List 1", "Untitled List 2",
		 "Untitled List 3", "Untitled List 4","Untitled List 5"];		
		dash.realtors    = [];
		dash.dateOfBirth = "";
		dash.gender      = "";

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
	getListId: function(listId){
		
		return "list"+listId;
	},

	updateDash: function(userId, property, listId){
				
		var operator;
		var list = this.getListId(listId)
		
		PropertiesCollection.insert(property, (err,id)=>{

			if(err)
				throw new Meteor.Error('UserActions.updateDash.insertProperty',err);			

			property._id = id;

			UserDash.update( {owner:userId}, {$push:{[list]:property}} , function(err){
				if(err)
					throw new Meteor.Error('UserActions.updateDash.upsertUserDash',err);
			});

		});				
	},
	
	removeFromDash:function(userId, propertyId, historyUpdate){
		
		UserDash.update(
			{owner:userId},
			{$pull:{properties: { _id: propertyId}}},
			(err) => {
				if(err)
					 throw new Meteor.Error('UpdateHistory.AcceptProperty', err);		

			if(historyUpdate)
				UserHistoryActions.addToApproved(userId, propertyId);
			else
				UserHistoryActions.addToRemoved(userId, propertyId);
		});
	}
}
