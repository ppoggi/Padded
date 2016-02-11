Template.main.helpers({
	isPro: function(){
				
		var user = Meteor.user()
		
		if(!user)
			return;

		if(user.profile.type == "pro")
			return true;
		else 
			return false;
	},

	isHome: function(){

		return !!FlowRouter.getRouteName('home');
	},
	isRealtor: function(){
		
		return !!FlowRouter.getRouteName('realtor');
	}
})