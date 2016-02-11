Template.realtor.events({

	'submit #create-generic-form': function(e){

		e.preventDefault();


		var name = e.target.text.value;
		if(!name || name == "")
			return;

		e.target.text.value = "";
		
		Meteor.call('createGenericList', name);		
	},

	'submit #add-client-form': function(e){

		e.preventDefault();
		
		var email = e.target.text.value;		

		if(!email || email == "")
			return;
		e.target.text.value = "";
		//check for email

		Meteor.call("inviteClient", email)
	}
});