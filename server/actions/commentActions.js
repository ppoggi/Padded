CommentActions = {

	createComment: function(user, comment, location){

		var commentObject = this.newComment(user, comment, location.listNumber);			

		return commentObject;		
	},

	createUserComments: function(user){
		
		var userComments = this.newUserComments(user);

		UserComments.insert(userComments, function(err){
			if(err)
				throw new Meteor.Error('UserActions.createComments', err);
		});
	},

	createCommentContainer: function(propertyId){

		var commentContainer = {};

		commentContainer.propertyId = propertyId;
		commentContainer.commentArray = [];

		return commentContainer;

	},

	newComment: function(user, comment, locationId){

		var text = comment.slice(0);
				
		var comment         = {};
		comment.timestamp   = Date.now();
		comment.ownerId     = user._id;
		comment.ownerName   = user.username;
		comment.commentText = text;
		comment.locationId  = locationId;
		
		return comment; 
	},

	insertComment: function(user, commentObject, propertyId){					

		var query =  {
			owner: user._id,
			"commentsList.propertyId" : propertyId
		};
		
		var update = {
			"commentsList.$.commentArray": commentObject
		};

		UserComments.update( query , {$push: update}, function(err, status){
			if(err)
				throw new Meteor.Error('UserActions.insertComment.UserComments.update', err);
			if(status == 0)
				throw new Meteor.Error('UserActions.insertComment.UserComments.update', "Insert Comment Failed");
		});	
	},

	realtorInsertComment: function(user, commentObject, propertyId, email){

		var query = {
			ownerEmail: email,
			 "commentsList.propertyId": propertyId
		};

		var update = {
			"commentsList.$.commentArray": commentObject
		};

		UserComments.update( query , {$push: update}, function(err, status){
			if(err)
				throw new Meteor.Error('UserActions.realtorInsertComment.UserComments.update', err);
			if(status == 0)
				throw new Meteor.Error('UserActions.realtorInsertComment.UserComments.update', "Insert Comment Failed");
		});	
	},

	newUserComments: function(user){ 
		
		var comments           = {};
		comments.owner         = user._id;
		comments.ownerEmail    = user.emails[0].address
		comments.commentsList  = [];
		return comments;
	},
}