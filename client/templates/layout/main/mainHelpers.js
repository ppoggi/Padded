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

	isRealtor: function(){
				
		if(FlowRouter.getRouteName().find('realtor') != -1);
			return true;
		else 
			return false;
	}
})