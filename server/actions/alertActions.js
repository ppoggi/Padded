AlertActions = {
	createAddClientAlertObj: function(user, clientEmail){

		var alert               = {};
		alert.messengerId       = user._id;
		alert.messengerEmail    = user.emails[0].address;
		alert.messengerUserName = user.username;
		alert.messageType       = "realtor.invite";
		alert.timestamp         = Date.now();
		return alert;
	}
}