DashboardActions = {
	
	updateListName: function(user, newName, currentList){
		var query    = {owner: user._id}
		var modifier = {$set: {['listNames.'+currentList]: newName}} 

		UserDash.update(query, modifier, function(err, status){
			if(err)
				throw new Meteor.Error('DashboardActions.updateListName.Userdash.update', err);
			if(status == 0)
				throw new Meteor.Error('DashboardActions.updateListName.Userdash.update', 'Update did not occur');
		});

	},
}