Template.main.helpers({
	isPro: function(){
				
		var user = Meteor.user()
		
		if(!user)
			return;

		if(user.profile.type == 'pro')
			return true;
		else 
			return false;
	},

	isHome: function(){

		if(FlowRouter.getRouteName() == 'home')
			return true;		
		else 
			return false;
	},

	isRealtor: function(){
		
		

		if(FlowRouter.getRouteName() == 'realtor')
			return true;
		else 
			return false;
	}
})