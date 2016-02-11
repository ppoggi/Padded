Template.profile.helpers({

	profile: function(){

		return Meteor.user().profile;
	}, 

	username: function(){

		return Meteor.user().username;
	}
})