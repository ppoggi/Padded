Template.realtorDash.helpers({

	dashboard: function(){
		
		return UserDash.findOne({});
	},

	alerts: function(dashboard){

		if(!dashboard)
			return;

		var alerts = dashboard.alerts;

		return alerts;
	},

	alertText: function(messageType, messengerEmail, messengerUserName){
				
		//create helper for this
		if(messageType =="realtor.invite"){
			var message = messengerUserName +"("+messengerEmail+") would like to add you as a client"			
			return message;
		}		
	},

	property: function(dashboard){	
				
		if(!dashboard)
			return;
		
		var properties = dashboard.list;		

		var propertiesList = [];

		for(var i=0; i < properties.length; i++)
			if(properties[i].listId == Session.get("currentList"))
				propertiesList.push(properties[i]);
		
		return propertiesList.reverse();
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

		return Session.get("currentList");
	},

	activeList: function(dashboard, currentList){
				
		 if(!dashboard)
			return "Loading...";

		return dashboard.listNames[currentList];		
	},

	listName: function(list){
		
		if(!list)
			return;
		
		var listName = [];
		
		for(var i = 0; i < list.length; i++){

			listName.push({value:i, name:list[i]})
		}
		return listName
	},

	detailLink: function(){
		  	    	    	    	   
	    var path = "/realtor/dashboard/"+FlowRouter.getParam("email")+"/detail/"+Session.get("currentList")+"/"+this._id;

	    return path;
	},

	isDetail: function(){

		var route = FlowRouter.getParam("id");

		if(route)
			return true;
		else 
			return false;

	},

	currentPerson: function(){
		return FlowRouter.getParam("email");
	}
});