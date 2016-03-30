Template.realtorCalendar.helpers({

	options: function(){
		return {
			
			id:'availabilityCalendar',	
			
			eventClick: function(eventObject, event, view){

				$('.fc-day').popover('hide');
				$('.fc-day-number').popover('hide');
				$('td').popover('hide');
				

				var start = new Date(eventObject.eventStart)
				var end = new Date(eventObject.eventEnd)

				console.log(eventObject, event)


				$(event.target).popover({

					html: true,
					trigger:'click',					
					container:'body',            		
           			placement: 'top',
           			content: '<div>Start: '+start+'</div>'+'<div>End: '+end+'</div>'
				});
			}			
		}
	}
})