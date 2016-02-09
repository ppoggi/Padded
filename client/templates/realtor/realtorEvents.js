Template.realtor.events({

	'submit #create-generic-form': function(e){

		e.preventDefault();


		var name = e.target.text.value;
		if(!name || name == "")
			return;

		e.target.text.value = "";
		
		Meteor.call('createGenericList', name);		
	}
});

//for Development

Template.realtor.events({

	'click #createRealtor': function(e){

		e.preventDefault();
		
		Meteor.call('createRealtor');		
	}
});