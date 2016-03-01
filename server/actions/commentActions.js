CommentActions = {


	newComment: function(user, text){

		var text = text.slice(0);
				
		var comment         = {};
		comment.timestamp   = Date.now();
		comment.ownerId     = user._id;
		comment.ownerName   = user.username;
		comment.commentText = text;		
		return comment; 
	},

	insertComment: function(user, currentList, propertyId, text){

		var commentObject = this.newComment(user, text);

		var query = {_id: currentList, 'properties._id': propertyId}

		UserLists.update(query, {$push: {'properties.$.comments': commentObject}}, function(err, status){
			if(err)
				throw new Meteor.Error('CommentActions.insertComment.update', err)
			if(status ==0)
				throw new Meteor.Error('CommentActions.insertComment.update', 'Could not insert')
		});
	}
}