RoommateActions = {

	inviteRoommateMessageType: "roommate.invite",

	sendRoommateInvite: function(recipientEmail, alert){

		var query = {'emails.address': recipientEmail };

		Meteor.users.update(query, {$push:{'profile.alerts': alert}}, function(err, status){
			if(err)
				throw new Meteor.Error('RoommateActions.sendRoommateInvite', err);

			if(status == 0)
				throw new Meteor.Error('RoommateActions.sendRoommateInvite', 'Could not update');
		});
	},

	inviteToGroup: function(user, roommate, currentListId){

		var alert = AlertActions.createAlertObj(user, roommate, this.inviteRoommateMessageType, currentListId);
		this.sendRoommateInvite(roommate, alert);
	},

	addToGroup: function(user, notification){

		var query  = {_id: notification.data, owners: notification.messengerId};

		var action = {$push: {owners: user._id}} 

		UserLists.update(query, action, function(err, status){

			if(err)
				throw new Meteor.Error('RoommateActions.addToGroup', err);
			if(status == 0)
				throw new Meteor.Error('RoommateActions.addToGroup', 'Could Not Update');

			AlertActions.removeNotification(user, notification);
		});
	}
}