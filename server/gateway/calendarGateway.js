Meteor.methods({

	insertEvent: function(availabilityObj){

		var user = Meteor.user();
		if(!user)
			throw new Meteor.error('CalendarGateway.insertAvailability', 'Must be logged in');

		CalendarActions.insertEvent(user, availabilityObj);							
	},

	removeEvent: function(eventId){

		var user = Meteor.user();
		
		if(!user)
			throw new Meteor.error('CalendarGateway.removeAvailability', 'Must be logged in');

		CalendarActions.removeEvent(user, eventId);
	}
})