Template.calendar.helpers({

	options: function(){

		return {
			
			id:'availabilityCalendar',			
			
			dayClick: function(date, event, view){
								
				$('.fc-day-number').popover('hide');
				$('td').popover('hide');
				$('div').popover('hide');
	    		$('a').popover('hide');
	    		$('td').popover('hide');

				$(event.target).popover({

					html: true,
					trigger:'click',					
					container:'body',
            		title: 'Add Availability',
           			placement: 'top',
           			content: CalendarHelper.popupContent(date.format('X'))
        		});
			},

			eventClick: function(eventObject, event, view){

				$('.fc-day').popover('hide');
				$('.fc-day-number').popover('hide');
				$('td').popover('hide');
				
				$(event.target).popover({

					html: true,
					trigger:'click',					
					container:'body',            		
           			placement: 'bottom',
           			content: CalendarHelper.eventContent(eventObject)
				});
			}
        }
    }
});
