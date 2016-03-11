CalendarActions = {

	availabilityObject : {
			title      : String,
			allDay     : Boolean,
			start      : Number,
			end        : Number,
			color      : String,			
			eventStart : Number,
			eventEnd   : Number,
			username   : String
	},

	checkAvailabilityObject: function(obj){

		try{

			check(obj, this.availabilityObject);
			
		}catch(err){
			
			throw new Meteor.Error('CalendarActions.checkAvailabilityObject','Invalid Object')
		}

		obj.owner = Meteor.userId();

		return obj;
	},

	updateUserAvailability: function(user, availabilityObj){
		
		Calendar.insert(availabilityObj, function(err, status){
			
			if(err)
				throw new Meteor.Error('CalendarActions.updateUserAvailability', err);
			if(status == 0)
				throw new Meteor.Error('CalendarActions.updateUserAvailability', 'Could not update');
		});
	},

	insertEvent: function(user, availabilityObj){
	
		availabilityObj = this.checkAvailabilityObject(availabilityObj);
		
		this.updateUserAvailability(user, availabilityObj);
	},

	removeEvent: function(user, eventId){

		var query = {_id: eventId, owner:user._id};

		Calendar.remove(query, function(err, status){
			if(err)
				throw new Meteor.error('CalendarActions.removeEvent', err)
			if(status == 0 )
				throw new Meteor.error('CalendarActions.removeEvent', 'Could not remove')
		});
	}
}