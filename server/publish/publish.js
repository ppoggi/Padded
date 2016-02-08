Meteor.publish('dashboard', function(){

	return UserDash.find({owner: this.userId});
});

Meteor.publish('comments', function(commentsListId, propertyId){

	var commentsList = UserActions.getCommentsListId(commentsListId);

	return UserComments.find({owner: this.userId}, {[commentsList]: {propertyId: propertyId}});
});


Meteor.publish('realtor', function(){

	return Realtors.find({userId: this.userId});
});
