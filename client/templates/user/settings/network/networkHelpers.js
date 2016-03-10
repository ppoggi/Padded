Template.network.helpers({

	realtors: function(){
		return Meteor.user().profile.realtors;
	},

	hasClients: function(){
		if(Meteor.user().profile.type == 'consumer')
			return false
		else 
			return true
	},

	clients: function(){
		
		if(!Meteor.user().realtorData)
			return false

		return Meteor.user().realtorData.clients;	
	}
})