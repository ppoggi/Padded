UserActions = {

	newDash: function(user){

		var dash         = {};
		dash.owner 	     = user._id;
		dash.userName    = user.username;		
		dash.email       = "";
		dash.list0       = [];
		dash.list1       = [];
		dash.list2       = [];
		dash.list3       = [];
		dash.list4       = [];
		dash.listNames   = ["Untitled List 1", "Untitled List 2",
		 "Untitled List 3", "Untitled List 4","Untitled List 5"];		
		dash.realtors    = [];
		dash.dateOfBirth = "";
		dash.gender      = "";

		return dash;	
	},

	newComment: function(user, comment){

		var text = comment.slice(0);
				
		var comment         = {};
		comment.timestamp   = Date.now();
		comment.ownerId     = user._id;
		comment.ownerName   = user.username;
		comment.commentText = text;
		
		return comment; 
	},

	insertComment: function(user, commentObject, userCommentList, propertyId){
		
		if( !user || !commentObject || !userCommentList || !propertyId)
			throw new Meteor.Error("UserActions.insertComment", "Invalid Properties");
				
		var query =  {
			owner: user._id,
			[userCommentList +".propertyId"] : propertyId
		};
		
		var update = {
			[userCommentList+".$.commentArray"]: commentObject
		};

		UserComments.update( query , {$push: update}, function(err){
			if(err){
				//throw new Meteor.Error('UserActions.insertComment.UserComments.update', err);
				console.log(err)
			}
		});	
	},

	newUserComments: function(user){ 
		
		var comments           = {};
		comments.owner         = user._id;
		comments.commentsList0 = [];
		comments.commentsList1 = [];
		comments.commentsList2 = [];
		comments.commentsList3 = [];
		comments.commentsList4 = [];
		return comments;
	},

	newHistory: function(user){
		
		var history      = {};
		history.owner    = user._id
		history.removed  = [];
		history.approved = [];
		return history;
	},

	createComment: function(user, comment, location){


		var commentObject = this.newComment(user, comment);

		var listNumber = this.getCommentsListId(location.listNumber);
		
		this.insertComment(user, commentObject, listNumber, location.propertyId)

		

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

	createDash: function(user){

		var dash = this.newDash(user);
		UserDash.insert(dash,function(err){
			if(err)
				throw new Meteor.Error('UserActions.createDash', err)
		});			
	},

	createHistory: function(user){
		var history = this.newHistory(user);

		UserHistory.insert(history, function(err){
			if(err)
				throw new Meteor.Error('UserActions.createHistory', err);
		})
	},

	initialize: function(user, options){
		
		this.createDash(user);
		this.createHistory(user);
		this.createUserComments(user);
	},

	getListId: function(listId){
		
		return "list"+listId;
	},

	getCommentsListId: function(commentsListId){

		return "commentsList"+commentsListId;
	},

	updateDash: function(userId, property, listId){
				
		var operator;
		var list = this.getListId(listId)
		
		PropertiesCollection.insert(property,
			(err,id) => {

			if(err)
				throw new Meteor.Error('UserActions.updateDash.insertProperty',err);			

			property._id = id;

			UserDash.update( {owner:userId},
				{$push:{[list]:property}},
				(err) =>{
				
					if(err)
						throw new Meteor.Error('UserActions.updateDash.pushUserDash',err);

					var commentsListId = this.getCommentsListId(listId);

					var commentContainer = this.createCommentContainer(id);
					
					UserComments.update({owner : userId},
					 {$push:{ [commentsListId] : commentContainer } },
					 function(err){
					 	if(err)
					 		throw new Meteor.Error('UserAction.updateDash.pushUserComments');
					 });
			});

		});				
	},
	
	removeFromDash:function(userId, propertyId, historyUpdate){
		
		UserDash.update(
			{owner:userId},
			{$pull:{properties: { _id: propertyId}}},
			(err) => {
				if(err)
					 throw new Meteor.Error('UpdateHistory.AcceptProperty', err);		

			if(historyUpdate)
				UserHistoryActions.addToApproved(userId, propertyId);
			else
				UserHistoryActions.addToRemoved(userId, propertyId);
		});
	}
}
