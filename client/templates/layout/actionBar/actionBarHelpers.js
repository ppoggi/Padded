Template.actionBar.helpers({
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
		
		var route = FlowRouter.getRouteName();				

		if( route.search('realtor') != -1 )
			return true;
		else 
			return false;
	},

	isProfile: function(){

		var route = FlowRouter.getRouteName();				

		if( route.search('profile') != -1 )
			return true;
		else 
			return false;	
	}
})