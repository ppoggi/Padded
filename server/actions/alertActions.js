AlertActions = {
	createAlertObj: function(user, recipientEmail, messageType, data){

		var alert               = {};
		alert.messengerId       = user._id;
		alert.messengerEmail    = user.emails[0].address;
		alert.messengerUserName = user.username;
		alert.messageType       = messageType;
		alert.recipientEmail    = recipientEmail;
		alert.timestamp         = Date.now();
		alert.data              = data;
		return alert;
	},

	removeNotification: function(user, message){
		
		Meteor.users.update(user, {$pull: {'profile.alerts':message}}, function(err, status){
			if(err)
				throw new Meteor.Error("AlertActions.removeNotfication.update", err);
			if(status == 0)
				throw new Meteor.Error("RealtorsActions.removeNotification", 'Client Message Not Removed');
		});
	},
}