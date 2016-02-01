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
	
	listView: function(){

		return Session.get("listView");
	},

	imageTile: function(){

		return Session.get("imageTile");
	},

	detailList: function(){
		
		return Session.get("detailList");		
	}
});
