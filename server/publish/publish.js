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