Template.genericList.onCreated(function(){
	
	var listId = FlowRouter.getParam("listId");

	this.autorun( () => {    			    	    	    
		
		this.subscribe('genericList',listId);		
	});  
   
});