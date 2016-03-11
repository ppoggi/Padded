Template.realtorCalendar.helpers({

	options: function(){
		return {
			
			id:'availabilityCalendar',	
			
			eventClick: function(eventObject, event, view){

				$('.fc-day').popover('hide');
				$('.fc-day-number').popover('hide');
				$('td').popover('hide');
				
				$(event.target).popover({

					html: true,
					trigger:'click',					
					container:'body',            		
           			placement: 'top',
           			content: 'hello'
				});
			}			
		}
	}
})