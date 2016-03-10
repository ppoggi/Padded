Template.calendar.onCreated(function(){
	
	this.autorun( ()=>{    			    	    	    

		this.subscribe('calendarData');	
	});  
});
