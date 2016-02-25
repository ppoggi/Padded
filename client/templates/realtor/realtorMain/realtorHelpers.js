Template.realtor.helpers({
	
	profile: function(){

		return Realtors.findOne({});		
	},
	genericList: function(list){
		
		if(!list)
			return;

		return list.reverse();
	},
	clients: function(){
		var user = Meteor.user();
		if(!user.realtorData)
			return;

		return user.realtorData.clients;
	},

	genericLists: function(){
		var user = Meteor.user();
		
		if(!user.realtorData)
			return;

		return user.realtorData.genericLists;
	}
});