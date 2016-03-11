Template.calendar.helpers({

	options: function(){

    	return{
			
			id:'availabilityCalendar',			
										
			dayClick: function(date, event, view){
								
				$(event.target).popover('toggle');
				
			},

			eventClick: function(eventObject, event, view){

				$(event.target).popover('toggle');
			},

			viewRender: function(){

				CalendarHelper.initializeDayPopups('top');

				var calendarEvents = Calendar.find({}).fetch();				

				setTimeout(function(){
					$('#availabilityCalendar').fullCalendar('removeEvents');		
					CalendarHelper.renderEvents(calendarEvents, 'right');							
				}, 100);				
			}	
    	}
    },

    mobileOptions: function(){

    	return{
			
			id:'availabilityCalendar',

			defaultView:'basicDay',										

			eventClick: function(eventObject, event, view){

				$(event.target).popover('toggle');
			},

			viewRender: function(){

				MobileCalendarHelper.onHover();
			
				var calendarEvents = Calendar.find({}).fetch();				

				setTimeout(function(){
					CalendarHelper.initializeDayPopups('top');
					$('#availabilityCalendar').fullCalendar('removeEvents');		
					CalendarHelper.renderEvents(calendarEvents, 'bottom');							
				}, 100);				
			}	
    	}
    }
});
