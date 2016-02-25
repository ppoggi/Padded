Meteor.methods({
	insertComment: function(currentList, propertyId, text){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');

		CommentHelpers.verify(text);
							
		CommentActions.insertComment(user, currentList, propertyId, text)	
	}
});

CommentHelpers = {

	verify: function(comment){
		if(comment == "" ||  comment.search("{") != -1)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Invalid Comment');	
	}
}

