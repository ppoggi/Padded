Template.dashboard.onCreated(function(){
	

	var commentListId = FlowRouter.getParam("listNumber");
	var propertyId = FlowRouter.getParam("id");

	this.autorun( () => {    			    	    	    
		
		this.subscribe('comments', commentListId, propertyId);		
	});  
      
});