Template.dashboard.helpers({

	dashboard: function(){
		
		return UserDash.find({});
	},

	property: function(dashboard){	
		var dash = dashboard.fetch();
		if(!dash[0])
			return;

		var properties =dash[0].properties;		
		return properties;
	},

	isMobile: function(){	
		
		if( window.innerWidth < 768){
			Session.set("isMobile", true);
			return true;
		}		
		return false
	},
	isTablet: function(){
		
		if(window.innerWidth >= 768 && window.innerWidth > 992){
			Session.set("isTablet", true);
			return true;
		}
			
		return false;
	},
	isDesktop: function(){
		
		if(window.innerWidth > 992){
			Session.set("isDesktop", true);
			return true;
		}			
		return false;
	},
	
});