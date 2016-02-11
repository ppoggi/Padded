UserActions = {

	newDash: function(user){

		var dash         = {};
		dash.owner 	     = user._id;
		dash.userName    = user.username;		
		dash.email       = user.emails[0].address;
		dash.list        = [];      
		dash.listNames   = ["Untitled List 1", "Untitled List 2",
		 "Untitled List 3", "Untitled List 4","Untitled List 5"];		
		dash.realtors    = [];
		dash.alerts      = [];

		return dash;	
	},

	newHistory: function(user){
		
		var history      = {};
		history.owner    = user._id
		history.removed  = [];
		history.approved = [];
		return history;
	},

	createDash: function(user){

		var dash = this.newDash(user);

		UserDash.insert(dash,function(err){
			if(err)
				throw new Meteor.Error('UserActions.createDash', err)
		});			
	},

	createHistory: function(user){

		var history = this.newHistory(user);

		UserHistory.insert(history, function(err){
			if(err)
				throw new Meteor.Error('UserActions.createHistory', err);
		})
	},

	addUserProperties: function(user){

		var properties = {
			age:null,
			gender: null,			
			type: "consumer",
			version: "free",
			subscriptionStatus:null
		}

		var data = {
			avgPropertyPrice:null,
			state: null,
			city: null,
		}

		user.profile = properties;
		user.userData = data;
		return user;
	},

	initialize: function(user, options){
		
		this.createDash(user);
		this.createHistory(user);
		CommentActions.createUserComments(user);
		return this.addUserProperties(user);
	},

	updateDash: function(userId, property, listId){
				
		var operator;
				
		property.listId = listId;
		
		PropertiesCollection.insert(property,
			(err,id) => {

			if(err)
				throw new Meteor.Error('UserActions.updateDash.insertProperty',err);			

			property._id = id;

			UserDash.update( {owner:userId},
				{$push:{list : property}},
				(err) =>{
				
					if(err)
						throw new Meteor.Error('UserActions.updateDash.pushUserDash',err);
					
					var commentContainer = CommentActions.createCommentContainer(id);
					
					UserComments.update({owner : userId},
					 {$push:{ commentsList : commentContainer } },
					 function(err){
					 	if(err)
					 		throw new Meteor.Error('UserAction.updateDash.pushUserComments');
					 });
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
