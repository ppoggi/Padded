Meteor.methods({
	insertComment: function(comment, location){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Must be logged in to comment');

//		comment = JSON.parse(comment);

		if(comment == "" ||  comment.search("{") != -1)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Invalid Comment');

		if(!location.listNumber || !location.propertyId)
			throw new Meteor.Error('CommentsGateway.insertComment', 'Invalid Location');

		//check to make sure comment list is valid
		if( parseInt(location.listNumber) < 0 || parseInt(location.listNumber) > 4)
			throw new Meteor.Error('CommentsGateway.insertComment', 'List Number');
			
		UserActions.createComment(user, comment, location);
	}
});