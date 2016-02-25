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

		var query = {_id: currentList, owners: user._id, 'properties._id': propertyId}

		UserLists.update(query, {$push: {'properties.$.comments': commentObject}});
	}
}