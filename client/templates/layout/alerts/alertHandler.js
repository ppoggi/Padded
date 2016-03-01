AlertHandler = {

	checkAlert: function(alert){
		
		var messageType = alert.messageType;

		if(messageType == 'realtor.invite')
			Meteor.call('clientAccept', alert);
		else if(messageType == 'roommate.invite')
			Meteor.call('addRoommateToList', alert);
	}
}