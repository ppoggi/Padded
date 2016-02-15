Template.registerHelper('isMobile', function(){	
		
	if( window.innerWidth < 768){
		Session.set("isMobile", true);
		return true;
	}		
	return false
});

Template.registerHelper('isTablet', function(){

	if( window.innerWidth < 992){
		Session.set("isTablet", true);
		return true;
	}
		
	return false;

});

Template.registerHelper('isDesktop', function(){

	if(window.innerWidth >= 992){
		Session.set("isDesktop", true);
		return true;
	}			
	return false;
});

Template.registerHelper('authInProcess', function(){
	return Meteor.loggingIn();
});

Template.registerHelper('canShow', function(){
	return !!Meteor.user();
});

Template.registerHelper('isPro', function(){
				
	var user = Meteor.user()
	
	if(!user)
		true;

	if(user.profile.type == 'pro')
		return true;
	else 
		return false;
});

Template.registerHelper('isRealtor', function(){	
	
	var route = FlowRouter.getRouteName();				

	if( route.search('realtor') != -1 )
		return true;
	else 
		return false;
});

Template.registerHelper('isProfile', function(){

	var route = FlowRouter.getRouteName();				

	if( route.search('profile') != -1 )
		return true;
	else 
		return false;	
});
