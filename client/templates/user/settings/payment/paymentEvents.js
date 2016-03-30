Template.payment.events({

	'submit #payment-method-form': function(e){
		
		e.preventDefault();
		
		if(!Stripe){			
			return;
		}
			
		var form = $(e.target);		

		$('#payment-method-submit').prop('disabled', true);

		Stripe.card.createToken(form, function(status, response){
			
			if(status == 200){

				Meteor.call('addUserStripeToken', response);
				
				$('#edit-card-info').addClass('hidden');
				$('#toggle-edit-card-info').addClass('hdn');
				$('#payment-method-submit').prop('disabled', false);
			}else{

				console.log('error creating token');
			}			
		});
	},

	'click #toggle-edit-card-info.hdn': function(e){
		
		e.stopImmediatePropagation();
		
		$('#edit-card-info').removeClass('hidden');
		$('#toggle-edit-card-info').removeClass('hdn');		
	},

	'click #toggle-edit-card-info': function(e){
		
		e.stopImmediatePropagation();

		$('#edit-card-info').addClass('hidden');
		$('#toggle-edit-card-info').addClass('hdn');
		$('#payment-method-submit').prop('disabled', false);			
	},

	'click #close-edit-card-info': function(e){

		e.stopImmediatePropagation();

		$('#edit-card-info').addClass('hidden');
		$('#toggle-edit-card-info').addClass('hdn');
		$('#payment-method-submit').prop('disabled', false);			
	},

	'click #toggle-edit-contact-info.hdn': function(e){
		
		e.stopImmediatePropagation();
		
		$('#edit-contact-info').removeClass('hidden');
		$('#toggle-edit-contact-info').removeClass('hdn');		
	},

	'click #toggle-edit-contact-info': function(e){
		
		e.stopImmediatePropagation();

		$('#edit-contact-info').addClass('hidden');
		$('#toggle-edit-contact-info').addClass('hdn');			
	},

	'click #close-edit-contact-info': function(e){

		e.stopImmediatePropagation();

		$('#edit-contact-info').addClass('hidden');
		$('#toggle-edit-contact-info').addClass('hdn');
	},

	'click #close-edit-notification-address': function(e){

		e.stopImmediatePropagation();

		$('#edit-notification-address').addClass('hidden');
		$('#toggle-edit-notification-address').addClass('hdn');
	},

	'click #toggle-edit-notification-address.hdn': function(e){
		
		e.stopImmediatePropagation();
		
		$('#edit-notification-address').removeClass('hidden');
		$('#toggle-edit-notification-address').removeClass('hdn');		
	},

	'click #toggle-edit-notification-address': function(e){
		
		e.stopImmediatePropagation();

		$('#edit-notification-address').addClass('hidden');
		$('#toggle-edit-notification-address').addClass('hdn');			
	}
});