Meteor.methods({

	declineProperty: function(property){

		var user = Meteor.user();		

		if(!user)
			throw new Meteor.Error("ClientActionGateway.inviteClient", "must be logged in to invite client");
		
		UserActions.removeFromDash(user, property);		
	},

	likeProperty: function(property){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error("ClientActionGateway.inviteClient", "must be logged in to invite client");
		
		UserHistoryActions.likeProperty(user, property);
	}
});
