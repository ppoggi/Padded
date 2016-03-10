Template.calendar.onRendered(function(){
	
	CalendarHelper = {

		popupContent: function(date){

	    	var content = '<form class="availabilityForm"><input class="calendarDate" type="hidden" value ='+date+'><div class="row"><label>Start '+
	    	'</label><select class="timeSelectStart"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>'+
	    	'7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></div>' +	
	    	'<div class="row"><label>AM or PM </label><select class="meridiemSelectStart"><option value="am">AM</option><option value="pm">PM</option></select></div>'+    
	    	'<div class="row"><label>End </label><select class="timeSelectEnd"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>'+
	    	'<option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></div>'+
			'<div class="row"><label>AM or PM </label><select class="meridiemSelectEnd"><option value="am">AM</option><option value="pm">PM</option></select></div>'+
			'<div class="row"><label>Rate</label><select class="rate"><option value="Good">Good</option><option value="Better">Better</option><option value="Best">Best</option></select></div>'+
			'<div class="row"><span class="flat sm blue">Add</span></div></form><script>$("span.flat.sm.blue").on("click", function(e)'+			
			'{ e.stopImmediatePropagation();CalendarHelper.submitForm([$(this).parent().parent().children(".calendarDate").val(),$(this).parent()'+
			'.parent().find(".timeSelectStart").val(),$(this).parent().parent().find(".meridiemSelectStart").val(),'+
			'$(this).parent().parent().find(".timeSelectEnd").val(),$(this).parent().parent().find(".meridiemSelectEnd").val(),$(this).parent().parent().find(".rate").val()])})</script>';
			
			return content;
	    },

	    submitForm: function(formArray){
	    	
	    	$('.fc-day').popover('hide');
			$('.fc-day-number').popover('hide');
			$('td').popover('hide');
	    	
	    	var eventTime = this.getTimeForEvent(formArray[0], formArray[1], formArray[2], formArray[3], formArray[4]);
	    	var eventObject = this.createEventObject(null, eventTime, formArray[5]);
	    	
	    	Meteor.call('insertEvent', eventObject);	    		    	
	    },

		getTimeForEvent: function(timestamp, hourStart, meridiemStart, hourEnd, meridiemEnd){
						
			var startTimestamp = this.createTimestampForEvent(timestamp, hourStart, meridiemStart);
			var endTimestamp = this. createTimestampForEvent(timestamp, hourEnd, meridiemEnd);

			return {start: startTimestamp, end: endTimestamp};
		},

		createTimestampForEvent: function(timestamp, hour, meridiem){

			var timestamp = timestamp *1000;			
			var time;
			
			if(meridiem == "am"){
				
				if(hour == 12)
					hour = 0;

				time = timestamp + (hour * 1000 * 60 * 60) 
			}				
			else{

				var twelveHours = 1000 * 60 * 60 * 12;
				time = timestamp + (hour * 1000 * 60 * 60) + twelveHours;
			}

			return time;			
		},

		createEventObject: function(title, eventTime, rate){			
			
			var eventObject = {};
			var color = this.getColor(rate);

			eventObject.title      = rate;
			eventObject.allDay     = false;
			eventObject.start      = eventTime.start;
			eventObject.end        = eventTime.end;
			eventObject.color      = color;
			eventObject.eventStart = eventTime.start,
			eventObject.eventEnd   = eventTime.end;

			return eventObject;
		},

		getColor: function(rate){
			
			if(rate == "Good")				
				return "rgb(243, 224, 191)"
			else if(rate == "Better")
				return "orange"
			else if(rate == "Best")
				return "orangered";
		},

	    renderEvents: function(events){
	    	
	    	if(!Array.isArray(events))
	    		return;
	    	
	    	for(var i = 0; i < events.length; i++){	    		
				$('#availabilityCalendar').fullCalendar('renderEvent', events[i]);
	    	}

			$('.fc-day').popover('hide');
			$('.fc-day-number').popover('hide');    	
	    },

	    eventContent: function(eventObject){

	    	var startHour   = this.getHourFromTimestamp(eventObject.eventStart);
	    	var startString = this.formatEventDateFromHour(startHour);
	    	
	    	var endHour   = null;
	    	var endString ='';
	    	
	    	if(eventObject.eventEnd){
	    		endHour   = this.getHourFromTimestamp(eventObject.eventEnd);
	    		endString = this.formatEventDateFromHour(endHour); 	
	    	}	    		
	
			var contentHidden = '<input class="eventId" value="'+ eventObject._id+'" type="hidden">';
	    	var contentTop = '<div class="row"><div class=col-xs-12><label>Start:'+startString+'</label></div></div>';
	    	var contentMid = '';
	    	
	    	if(endHour)
	    		contentMid = '<div class="row"><div class=col-xs-12><label>End:'+endString+'</label></div></div>';
	    	
	    	var contentBottom = this.removeButton();

	    	return contentHidden +contentTop+contentMid +contentBottom;
	    },

	    getHourFromTimestamp: function(timestamp){

	    	var offset = new Date().getTimezoneOffset() / 60;	   
	    	var hour = (new Date(timestamp).getHours() +offset ) % 24;	

	    	return hour;
	    },

	    formatEventDateFromHour: function(hour){
	    	
	    	var meridiem;

	    	if(hour < 12)
	    		meridiem = "AM"
	    	else
	    		meridiem = "PM"

	    	if(hour > 12 )
	    		hour = hour % 12
	    		
	    	if(hour == 0 )
	    		hour == 12

	    	return hour + " " + meridiem;
	    },

	    removeButton: function(){

	    	return '<div class="row"><span class="flat sm blue removeEvent">Remove</span></div>'+
	    	'<script>$("span.flat.sm.blue.removeEvent").on("click", function(e){'+
	    	'CalendarHelper.removeEvent($(this).parent().parent().find(".eventId").val())'+
	    	'});</script>';	    	
	    },

	    removeEvent: function(eventId){
	    	
	    	Meteor.call('removeEvent', eventId);
	    	$('.popover').popover('hide');

	    }
	}

	Tracker.autorun(function(){

		var calendarEvents = Calendar.find({}).fetch();
		
		$('#availabilityCalendar').fullCalendar('removeEvents');		
		CalendarHelper.renderEvents(calendarEvents);
	})	
});



