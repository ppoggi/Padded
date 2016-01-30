UserHistoryActions = {

	addToApproved: function(userId, propertyId){
		
		if(!propertyId)
			return;
		UserHistory.update(
			{owner: userId},
			{$push: {approved: propertyId }},
			function(err){
				if(err)
					throw new Meteor.Error('UpdateHistroy.AcceptProperty', err);
		});	

	},
	addToRemoved: function(userId, propertyId){

		if(!propertyId)
			return;

		UserHistory.update(
			{owner: userId},
			{$push: {removed: propertyId}},
			function(err){
				if(err)
					throw new Meteor.Error('UpdateHistroy.declineProperty', err);
		});	

	}
}