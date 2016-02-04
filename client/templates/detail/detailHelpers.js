Template.detail.helpers({
	item: function(){

		var list = "list" + FlowRouter.getParam("listNumber");
		var id = FlowRouter.getParam("id");

		if(!this.fetch()[0])
			return;		
		
		var places = this.fetch()[0][list]
		
		for(var i =0; i< places.length; i++)			
			if(places[i]._id == id)
				return places[i];		
	},

	comments: function(){

		var commentListId = FlowRouter.getParam("listNumber");
		var commentList = ClientHelpers.getClientList(commentListId);
		var propertyId = FlowRouter.getParam("id");		
		var projection = {[commentList +".$"]: 1}
		
		var comments = UserComments.findOne(
			{[commentList]: 
				{$elemMatch:{propertyId: propertyId}}
			},
			projection
		);

		if(!comments)
			return;
		
		
		

		for(var i = 0; i < comments[commentList].length ; i++)			
			if(comments[commentList][i].propertyId == propertyId)				
				return comments[commentList][i].commentArray;						
	},

	time: function(timestamp){

		var time = DateHelpers.dateString(timestamp)
		return time;		
	}
});