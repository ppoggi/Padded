Template.dashboard.onCreated(function(){
	
	this.autorun( () => {    			    	    	    
		
		this.subscribe('dashboard');		
	});  

    Session.set('listView', true);
    Session.set('imageTile', false);
    Session.set('detailList', false);
    Session.set("currentList", 0);           
});

 Template.dashboard.rendered = function() {
 	


 };