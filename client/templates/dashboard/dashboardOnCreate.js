Template.dashboard.onCreated(function(){
	
	this.autorun( () => {    			    	    	    
		
		this.subscribe('dashboard');		
	});  

    Session.set('listView', true);
    Session.set('imageTile', false);
    Session.set('detailList', false);
});

 Template.dashboard.rendered = function() {
 	


 };