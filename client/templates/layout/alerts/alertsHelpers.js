Template.alerts.helpers({
	
	alerts: function(){			
		
		var user = Meteor.user()
		if(!user)
			return;
		return user.profile.alerts
	},
	
	alertText: function(messageType, messengerEmail, messengerUserName){
		
		//create helper for this
		if(messageType == "realtor.invite")
			return messengerUserName +"("+messengerEmail+") would like to add you as a client";
			
		else if( messageType== "roommate.invite")
			return messengerUserName +"("+messengerEmail+") would like to add you as a roommate";
	}
})