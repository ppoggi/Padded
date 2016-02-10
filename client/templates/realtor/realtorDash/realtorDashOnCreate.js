Template.realtorDash.onCreated(function(){
	
	var email = FlowRouter.getParam("email");
		
	this.autorun( ()=>{    			    	    	    
			
		this.subscribe('realtorDash', email);		
	});  
	

    Session.set('listView', true);
    Session.set('imageTile', false);
    Session.set('detailList', false);
    Session.set("currentList", 0);           
});

 Template.dashboard.rendered = function() {
 	


 };