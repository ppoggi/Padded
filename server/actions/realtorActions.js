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
		Realtors.insert(realtor, function(err){
			if(err)
				throw new Meteor.Error('RealtorActions.createRealtor', err);
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

		Realtors.update({userId: message.messengerId}, {$push: {clients:clientObj}}, (err, status) => {
			if(err)
				throw new Meteor.Error("RealtorActions.acceptClient.Realtors.update", err);
			
			if(status != 0)
				UserDash.update({owner:user._id}, {$pull: {alerts:message}}, function(err){
					if(err)
						throw new Meteor.Error("RealtorsActions.acceptClient.UserDash.update", err)
				});
		});			
	},

	declineClient: function(user, message){

		UserDash.update({owner:user._id}, {$pull: {alerts:message}}, function(err){
			if(err)
				throw new Meteor.Error("RealtorsActions.acceptClient.UserDash.update", err)
		});
	}
}