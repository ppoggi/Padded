Template.dashboard.onCreated(function(){
	
	this.autorun( () => {    			    	    	    
		
		this.subscribe('dashboard');		
	});  
});

 Template.dashboard.rendered = function() {
 	
 };
