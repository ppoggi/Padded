Accounts.onCreateUser(function(options, user){
	
	var user = UserActions.initialize(user, options);

	return user;
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});
