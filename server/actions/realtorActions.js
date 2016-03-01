RealtorActions = {

	realtorStates        : ["trial","inactive","active"],
	realtorPaymentStates : ["goodStanding", "paymentProcessing", "paymentDeclined"],
	
	generateRandomId:function(){
		return Random.id(40);
	},  

	newRealtor: function(user){
		
		var realtor           = {};
		realtor.userId        = user._id;
		realtor.personalInfo  = {};
		realtor.genericLists  = [];
		realtor.clients       = [];   
		realtor.state         = 0;
		realtor.paymentState  = 0;		

		return realtor;
	},

	createRealtor: function(user){
			
		realtor = this.newRealtor(user);
		Meteor.users.update(user ,{$set:{realtorData: realtor}}, function(err, id){
			if(err)
				throw new Meteor.Error('RealtorActions.createRealtor', err);			
						
			Meteor.users.update( {_id: user._id} , {$set:{'profile.type': "pro"}}, function(err, status){
				if(err)
					throw new Meteor.Error('RealtorActions.createRealtor.users.update', err);			
				if(status == 0)
					throw new Meteor.Error('RealtorActions.createRealtor.users.update', 'Could not update');
			});			
		});
	},

	newGenericList: function(user, listName){
				
		var uri = this.generateRandomId();

		var genericList        = {};
		genericList.owner      = user._id;
		genericList.properties = [];
		genericList.recipients = [];
		genericList.uri        = uri;
		genericList.listName   = listName;
		genericList.timestamp  = Date.now(); 

		return genericList;
	},

	newRealtorGenericObj: function(listId, listName, timestamp, uri){
		
		var genObj       = {};
		genObj.listId    = listId;
		genObj.listName  = listName;
		genObj.timestamp = timestamp;
		genObj.uri       = uri;
		
		return genObj;
	}, 

	createGenericList: function(user, listName){

		var genericList  = this.newGenericList(user, listName);
				
		GenericLists.insert( genericList, (err, listId) => {
			if(err)
				throw new Meteor.Error('RealtorActions.createGenericList.GenericLIsts.insert',err);

			var realtorObj = this.newRealtorGenericObj(listId, listName, genericList.timestamp, genericList.uri);
			
			Meteor.users.update(user, {$push: {'realtorData.genericLists': realtorObj}}, function(err){
				if(err)
					throw new Meteor.Error('RealtorActions.createGenericList.Realtors.update', err);
			});	
		});
	},

	updateGenericListProperty: function(userId, property, listId){
		
		GenericLists.update({owner:userId,uri:listId},{$push:{properties:property}}, function(err){
			if(err)
				throw new Meteor.Error('RealtorActions.updateGenericListProperty.update', err);
		})
	},

	addClient: function(user, clientEmail){

		var alert = AlertActions.createAddClientAlertObj(user, clientEmail);
		
		Meteor.users.update({'emails.address':clientEmail}, {$push:{'profile.alerts': alert}}, function(err, status){
			if(err)
				throw new Meteor.Error('RealtorActions.addClient', err);

			if(status == 0)
				
				throw new Meteor.Error('RealtorActions.addClient', 'Could not update');
		});
	},

	addRealtorToLists: function(user, message, callback){

		UserLists.update( {owners : {$in:[user._id]}}, {$push:{realtors: message.messengerId }},(err, status)=>{
				if(err)
					throw new Meteor.Error("RealtorActions.addRealtorToLists.UserLists.update", err);
				if(status == 0)
					throw new Meteor.Error("RealtorActions.addRealtorToLists.UserLists.updat", "Couldnt update realtor to lists");

			callback(user, message);
		});

	},

	createClientObject: function(user){
		
		var client      = {};
		client.username = user.username;
		client.email    = user.emails[0].address;
		client.clientId = user._id;
		return client;

	},

	acceptClient: function(user, message){

		var clientObj = this.createClientObject(user);	

		Meteor.users.update(user, {$push:{'profile.realtors': message.messengerId}},(err,status)=>{

			if(err)
				throw new Meteor.Error("Realtor.Actions.Users.update.realtors", err);
			
			if(status == 0)
				throw new Meteor.Error("Realtor.Actions.Users.update.realtors", "Couldnt update User Dash");

			Meteor.users.update({_id: message.messengerId}, {$push: {'realtorData.clients':clientObj}}, (err, status) => {
				if(err)
					throw new Meteor.Error("RealtorActions.acceptClient.RealtorData.update", err);
				if(status == 0)
					throw new Meteor.Error("RealtorActions.acceptClient.RealtorData.update", "Couldnt update realtor");

				this.addRealtorToLists(Meteor.user(), message, this.removeClientMessage);
			});				
		});			
	},

	removeClientMessage: function(user, message){
		
		Meteor.users.update(user, {$pull: {'profile.alerts':message}}, function(err, status){
			if(err)
				throw new Meteor.Error("RealtorsActions.declineClient.update", err);
			if(status == 0)
				throw new Meteor.Error("RealtorsActions.declineClient.update", 'Client Message Not Removed');
		});
	},

	insertPropertyToList: function(userId, property, listId){

		UserLists.update({_id: listId, realtors:{$in:[userId]}}, {$push: {properties: property}}, function(err, status){
			if(err)
				throw new Meteor.Error("RealtorsActions.updateClientList.update", err);
			if(status == 0)
				throw new Meteor.Error("RealtorsActions.updateClientList.update", 'List not updated');
		});
	},

	updateClientList: function(userId, property, listId){

		PropertyActions.createProperty(userId, property, listId, this.insertPropertyToList);
	}		
}