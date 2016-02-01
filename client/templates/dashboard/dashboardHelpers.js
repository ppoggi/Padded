Template.dashboard.helpers({

	dashboard: function(){
		
		return UserDash.find({});
	},

	property: function(dashboard, list){	
		
		var dash = dashboard.fetch();
		if(!dash[0])
			return;
		
		var properties =dash[0]["list"+list];
		
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
	},

	currentList: function(){

		return Session.get("currentList")
	},

	activeList: function(dashboard, currentList){
		dash = dashboard.fetch();
			
		 if(!dash[0])
			return "Loading...";

		return dash[0].listNames[currentList];		
	},
	listName: function(dashboard){
		var dash = dashboard.fetch();
		var list = [];
		
		if(!dash[0])
			return;

		for(var i =0; i< dash[0].listNames.length; i++ ){
			list.push({name:dash[0].listNames[i], value:i});
		}

		return list;
	}
});
