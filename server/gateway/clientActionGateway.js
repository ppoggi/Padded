Meteor.methods({
	
	inviteClient: function(email){

		var user = Meteor.user();

		if(!user )
			throw new Meteor.Error("ClientActionGateway.inviteClient", "Must be logged in to invite client");

		if(user.profile.type !== "pro" )
			throw new Meteor.Error("ClientActionGateway.inviteClient", "Must be Pro in to invite client");

		RealtorActions.addClient(user, email);
	},

	clientAccept: function(message){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error("ClientActionGateway.clientAccept", "Must be logged in to accept");

		RealtorActions.acceptClient(user, message);
	}
});