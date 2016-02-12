Meteor.methods({
	updateListName: function(newName, currentList){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');

		DashboardActions.updateListName(user, newName, currentList);
	}
})