UserHistoryActions = {

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

	},

	likeProperty: function(user, property){

		var query  = {owner:user._id, 'list._id': property._id};
		
		var update = {$set:{'list.$.isLiked': true}} 

		UserDash.update(query, update, function(err, status){
			if(err)
				throw new Meteor.Error('UserHistoryActions.likeProperty.update', err);
			if(status == 0)
				throw new Meteor.Error('UserHistoryActions.likeProperty.update','Property did not update');
		});

	},
		newHistory: function(user){
		
		var history      = {};
		history.owner    = user._id
		history.removed  = [];
		history.approved = [];
		return history;
	},

	createHistory: function(user){

		var history = this.newHistory(user);

		UserHistory.insert(history, function(err){
			if(err)
				throw new Meteor.Error('UserActions.createHistory', err);
		})
	},
}