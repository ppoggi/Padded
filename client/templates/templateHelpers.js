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

