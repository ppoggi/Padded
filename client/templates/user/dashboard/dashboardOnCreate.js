Template.dashboard.onCreated(function(){
	
		this.autorun( ()=>{    			    	    	    
				
			this.subscribe('UserLists');		
		});  
	
    Session.set('listView', true);
    Session.set('imageTile', false);
    Session.set('detailList', false);
    Session.set("currentList", null);          
});
