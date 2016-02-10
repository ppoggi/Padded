Meteor.methods({
	insertComment: function(comment, location){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');

		CommentHelpers.verify(comment, location);
								
		var commentObj = CommentActions.createComment(user, comment, location);

		CommentActions.insertComment(user, commentObj, location.propertyId)	
	},

	realtorInsertComment: function(email, comment, location){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');

		CommentHelpers.verify(comment, location);

		var commentObj = CommentActions.createComment(user, comment, location);

		CommentActions.realtorInsertComment(user, commentObj, location.propertyId, email);
	},
});

CommentHelpers = {

	verify: function(comment, location){
		if(comment == "" ||  comment.search("{") != -1)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Invalid Comment');

		if(!location.listNumber || !location.propertyId)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Invalid Location');
		
		if( parseInt(location.listNumber) < 0 || parseInt(location.listNumber) > 4)
			throw new Meteor.Error('CommentsGateway.insertComment', 'List Number');		
	}

}

