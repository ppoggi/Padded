UserActions = {

	newUserList: function(user){
		
		var list = {};
		list.name      = "untitled list";
		list.owners    = [user._id];
		list.roommates = [];
		list.properties= [];

		return list;
	},

	createUserList: function(user){

		var list = this.newUserList(user);
		
		UserLists.insert(list, function(err, status){
			if(err)
				throw new Meteor.Error('UserActions.createUserList.insert', err);
			if(status == 0)
				throw new Meteor.Error('UserActions.createUserList.insert', 'Could not insert');
		});
	},
	insertPropertyToList: function(userId, property, listId){

		var query = {_id: listId, owners:userId};
		var action = {$push: {properties:property}}
		UserLists.update(query, action, function(err, status){
	
			if(err)
				throw new Meteor.Error('UserActions.addPropertyToList.update', err);
			if(status == 0)
				throw new Meteor.Error('UserActions.addPropertyToList.update', 'Could not update');
		});	
	},

	addPropertyToList: function(userId, property, listId){

		PropertyActions.createProperty(userId, property, listId, property, this.insertPropertyToList);
	},

	updateListName: function(user, listId, newListName){
						
		var query = {_id: listId, owners: user._id};
		var action = {$set: {name: newListName}}

		UserLists.update(query, action, function(err, status){
			if(err)
				throw new Meteor.Error('UserActions.updateListName.update', err);
			if(status == 0)
				throw new Meteor.Error('UserActions.updateListName.update', 'Could not update');
		});
	},

	addUserData: function(user){

		var properties = {
			age      		  : null,
			gender   		  : null,			
			type              : "consumer",			
			subscriptionStatus: null,
			realtors          : [],
			roommates         : [],
			alerts            : [],
		}

		var data = {
			avgPropertyPrice:null,
			state: null,
			city: null,
		}

		user.profile = properties;
		user.userData = data;
		return user;
	},

	initialize: function(user, options){
				
		UserHistoryActions.createHistory(user);
		this.createUserList(user);		
		return this.addUserData(user);
	}
}
