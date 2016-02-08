Meteor.methods({

	createGenericList: function(name){

		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error('GenericListGateway.createGenericList', 'Invalid User');

		RealtorActions.createGenericList(user, name);

	}

});