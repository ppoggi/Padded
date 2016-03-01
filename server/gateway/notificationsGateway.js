Meteor.methods({
	removeNotification: function(notfication){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('NotificationsGateway.removeNotification', 'Must be logged in');

		AlertActions.removeNotification(user, notfication);
	}	
})