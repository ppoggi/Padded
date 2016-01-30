Meteor.methods({

	acceptProperty: function(propertyId){
				
		var userId = Meteor.userId();		
		UserActions.removeFromDash(userId, propertyId, true);		
	},

	declineProperty: function(propertyId){

		var userId = Meteor.userId();		
		UserActions.removeFromDash(userId, propertyId, false);		
	}

})
