Meteor.publish('UserLists', function(){
 	
 	return UserLists.find({owners: this.userId});
});

Meteor.publish('genericList', function(listId){	

	return GenericLists.find({uri:listId});
});

Meteor.publish('userInfo', function(){

	return Meteor.users.find({ _id:this.userId}, {fields:{properties:1}});
});

Meteor.publish('realtorData', function(){

	return Meteor.users.find({ _id:this.userId}, {fields:{realtorData:1}});
});

Meteor.publish('stripe', function(){

	return Meteor.users.find({ _id:this.userId}, {fields:{stripe:1}});
});

Meteor.publish('realtorDash', function(clientId){

	return UserLists.find({ owners:clientId});
});

Meteor.publish('calendarData', function(clientId){

	return Calendar.find({ owner: this.userId});
});


Meteor.publish('RealtorCalendarData', function(clientIds){

	if( clientIds == null)
		return null;
	
	return Calendar.find({ owner: {$in: clientIds}});
});