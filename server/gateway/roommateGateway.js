Meteor.methods({
	
	inviteRoommateToList: function(roommate , currentListId){
		
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('RoommateGateway.inviteRoommateToList', 'Must be logged in');

		RoommateActions.inviteToGroup(user, roommate, currentListId);
	},

	addRoommateToList: function(notification){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('RoommateGateway.addRoommateToList', 'Must be logged in');

		RoommateActions.addToGroup(user, notification);
	}
})