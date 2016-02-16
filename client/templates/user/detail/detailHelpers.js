Template.detail.helpers({
	
	item: function(){

		var list = "list" + FlowRouter.getParam("listNumber");
		var id = FlowRouter.getParam("id");

		if(!this)
			return;		
		
		var places = this.list;	
		
		if( !places)
			return;
	
		for(var i =0; i< places.length; i++)			
			if(places[i]._id == id)
				return [places[i]];		
	},

	comments: function(){

		var commentListId = FlowRouter.getParam("listNumber");		
		var propertyId = FlowRouter.getParam("id");		

		var commentsObject = UserComments.findOne({});

		if(!commentsObject)
			return;

		var commentsList = commentsObject.commentsList;		

		for(var i = 0; i < commentsList.length; i++){
			if(commentsList[i].propertyId == propertyId)		
				return commentsList[i].commentArray;							
		}

		return [];		
	},

	time: function(timestamp){

		var time = DateHelpers.dateString(timestamp)
		return time;		
	}
});