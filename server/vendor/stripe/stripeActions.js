StripeActions = {

	createStripeUser: function(user, token){
			
		var stripe = StripeAPI(StripeKeys.secret);
						
		stripe.customers.create({
			source: token,
			plan: "test-monthly",
			email: user.emails[0].address
		}, Meteor.bindEnvironment((err, customer) =>{
		  
		 	if(err)
		  		throw new Meteor.Error('StripeActions.createStripeUser.create', err);

		 	this.addUserToken(user, customer);
		}));
	},

	addUserToken: function(user, customer){
		
		var query = user;

		var action = {$set:{stripe: customer}};

		Meteor.users.update(query, action, function(err, status){

			if(err)
				throw new Meteor.Error('StripeActions.addUserToken', err);
			
			if(status == 0)
				throw new Meteor.Error('StripeActions.addUserToken', err);
		});
	},


}