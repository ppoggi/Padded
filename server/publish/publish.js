Meteor.publish('dashboard', function(){

	return UserDash.find({owner: this.userId});
});

Meteor.publish('realtorDash',function(email){

	return UserDash.find({email:email, realtors:this.userId});
});

Meteor.publish('comments', function(commentsListId, propertyId){

	return UserComments.find({owner: this.userId}, {commentsList: {propertyId: propertyId}});
});

Meteor.publish('realtorComments', function(commentsListId, propertyId, email){

	return UserComments.find({ownerEmail: email}, {commentsList: {propertyId: propertyId}});
});

Meteor.publish('realtor', function(){

	return Realtors.find({userId: this.userId});
});

Meteor.publish('genericList', function(listId){	

	return GenericLists.find({uri:listId});
});



