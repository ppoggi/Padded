Accounts.onCreateUser(function(options, user){
	
	UserActions.initialize(user, options);

	return user;
});
