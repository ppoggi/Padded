Meteor.methods({
	updateListName: function(listId, listName){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');

		UserActions.updateListName(user, listId, listName);
	},

	createUserList: function(){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');	

		UserActions.createUserList(user);
	}
})