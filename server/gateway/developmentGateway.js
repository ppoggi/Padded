Meteor.methods({


	createRealtor:function(){
		var user = Meteor.user();

		RealtorActions.createRealtor(user);

	}

});