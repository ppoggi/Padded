Template.realtorDetail.onCreated(function(){
	
	var commentListId = FlowRouter.getParam("listNumber");
	var propertyId    = FlowRouter.getParam("id");
	var email         = FlowRouter.getParam("email");

	this.autorun( () => {    			    	    	    
		
		this.subscribe('realtorComments', commentListId, propertyId, email);		
	});        
});