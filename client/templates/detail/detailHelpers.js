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
	}
});