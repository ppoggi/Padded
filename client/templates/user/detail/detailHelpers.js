Template.detail.helpers({
	
	property: function(){
		
		var id = FlowRouter.getParam("id");

		var currentListId = Session.get('currentListId');

		var list = UserLists.findOne({_id:currentListId}, {fields: {properties:1}});
		
		if(!list)
			return;

		var properties = list.properties;

		for(var i = 0; i <properties.length; i++){
			if(properties[i]._id == id)
				return properties[i];
		}
	},

	comments: function(property){
		
		if(!property)
			return;

		return property.comments;
	},

	time: function(timestamp){

		var time = DateHelpers.dateString(timestamp)
		return time;		
	}
});