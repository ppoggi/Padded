Template.realtorCalendar.onCreated(function(){
		
	this.autorun( ()=>{    	    

		var calendarOwners = Session.get('listOwners');
		
		this.subscribe('RealtorCalendarData', calendarOwners);	
	});  
});
