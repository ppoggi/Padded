Template.realtorCalendar.onRendered(function(){

	RealtorCalendarHelper = {

		renderEvents: function(events){
	    	
	    	if(!Array.isArray(events))
	    		return;
	    	
	    	for(var i = 0; i < events.length; i++){	    		
				$('#availabilityCalendar').fullCalendar('renderEvent', events[i]);
	    	}

			$('.fc-day').popover('hide');
			$('.fc-day-number').popover('hide');    	
	    }
	}

	Tracker.autorun(function(){

		var calendarEvents = Calendar.find({}).fetch();
		
		$('#availabilityCalendar').fullCalendar('removeEvents');		
		RealtorCalendarHelper.renderEvents(calendarEvents);
	});	
});