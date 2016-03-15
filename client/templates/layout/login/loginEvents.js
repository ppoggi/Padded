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
		
		console.log($(e.target).val())


	}

});