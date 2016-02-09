Meteor.methods({
	
	inviteClient: function(email){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error("ClientActionGateway.inviteClient", "must be logged in to invite client");

		RealtorActions.addClient(user, email);
	},

	clientAccept: function(message){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error("ClientActionGateway.clientAccept", "must be logged in to accept");

		RealtorActions.acceptClient(user, message);
	},

	clientDecline: function(message){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error("ClientActionGateway.clientDecline", "must be logged in to decline");

		RealtorActions.declineClient(user, message);
	}
});