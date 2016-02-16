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
		realtor.notifications = [];

		return realtor;
	},

	createRealtor: function(user){
			
		realtor = this.newRealtor(user);
		Realtors.insert(realtor, function(err, id){
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
			
			Realtors.update({userId:user._id}, {$push: {genericLists: realtorObj}}, function(err){
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

	createAddClientAlertObj: function(user, clientEmail){

		var alert               = {};
		alert.messengerId       = user._id;
		alert.messengerEmail    = user.emails[0].address;
		alert.messengerUserName = user.username;
		alert.messageType       = "realtor.invite";
		alert.timestamp         = Date.now();
		return alert;
	},

	addClient: function(user, clientEmail){

		var alert = this.createAddClientAlertObj(user, clientEmail);
		
		UserDash.update({email:clientEmail},{$push:{alerts: alert}}, function(err, status){
			if(err)
				throw new Meteor.Error('RealtorActions.addClient', err);

			if(status == 0)
				//error
				console.log("couldn't find recipient")
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

		UserDash.update( {owner:user._id},{$push:{realtors: message.messengerId}},(err,status)=>{

			if(err)
				throw new Meteor.Error("Realtor.Actions.Userdash.update.realtors", err);
			
			if(status == 0)
				throw new Meteor.Error("Realtor.Actions.Userdash.update.realtors", "Couldnt update User Dash");

			Realtors.update({userId: message.messengerId}, {$push: {clients:clientObj}}, (err, status) => {
				if(err)
					throw new Meteor.Error("RealtorActions.acceptClient.Realtors.update", err);
				if(status == 0)
					throw new Meteor.Error("RealtorActions.acceptClient.Realtors.update", "Couldnt update realtor");
				
				UserDash.update({owner:user._id}, {$pull: {alerts:message}}, function(err, status){
					if(err)
						throw new Meteor.Error("RealtorsActions.acceptClient.UserDash.update.alerts", err)
					if(status == 0)
						throw new Meteor.Error("RealtorsActions.acceptClient.UserDash.update.alerts", "Not updated")

				});
			});	
			
		});			
	},

	declineClient: function(user, message){

		UserDash.update({owner:user._id}, {$pull: {alerts:message}}, function(err){
			if(err)
				throw new Meteor.Error("RealtorsActions.acceptClient.UserDash.update", err)
		});
	},

	updateClientDash: function(userId, property, email, listId){

		property.listId = listId;
		property.fromRealtor = true;
		property.isLiked = false;
		property.realtorId = userId;
		
		var query = {email:email, realtors:userId};

		var modifier = {$push: {list:property}}				
				
		property.listId = listId;
		
		PropertiesCollection.insert(property,
			(err,id) => {

			if(err)
				throw new Meteor.Error('UserActions.updateDash.insertProperty',err);			

			property._id = id;

			UserDash.update( query, modifier,
				(err) =>{
				
					if(err)
						throw new Meteor.Error('RealtroActions.updateClientDash.pushUserDash',err);
					
					var commentContainer = CommentActions.createCommentContainer(id);
					
					UserComments.update({ownerEmail : email},
					 {$push:{ commentsList : commentContainer } },
					 function(err){
					 	if(err)
					 		throw new Meteor.Error('RealtorACtions.updateClientDash.pushUserComments');
					 });
			});

		});	


	}
}