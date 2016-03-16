Template.login.events({

	'click #new-user': function(e){
		
		e.preventDefault();
		Session.set('isNewLogin', true);
	},
	
	'click #returning-user': function(e){
		
		e.preventDefault();		
		Session.set('isNewLogin', false);
	},

	'click #login-submit': function(e){
		
		e.preventDefault();
		$('#login-form').submit();
	},

	'submit #login-form': function(e){

		e.preventDefault();
					
		Meteor.loginWithPassword($('#login-email').val(), $('#login-password').val(), function(err){
			if(err)
				console.log(err);
			else
				FlowRouter.go('/');
		});
	},

	'click #create-account-submit': function(e){

		e.preventDefault();
		$('#new-user-form').submit();
	},

	'submit #new-user-form': function(e){

		e.preventDefault();


		var user = {
			username : null,
			email    : null,
			phone    : null,
			password : null,
			profile  :{
				phone: null
			}
		}
		
		user.username = $('#new-user-name').val();
			

		user.email = $('#new-user-email').val();
		
		var phone = $('#new-user-phone').val();
		
		if(!phone)
			phone = "";

		user.profile.phone = phone;

		var password1 = $('#password-1').val();
		var password2 = $('#password-2').val();

		if(password1 != password2)
			console.log('incorrect password')
		else
			user.password = password2;
	
		Accounts.createUser(user, function(err){
			if(err)
				console.log(err)
			else
				FlowRouter.go('/');
		});
	}

});