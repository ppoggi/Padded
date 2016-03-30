Meteor.startup(function() {
    
     Stripe.setPublishableKey('pk_test_bYC5rPoNpdrBdlyJfYBFEJ46');

     var handler = StripeCheckout.configure({
		key: 'pk_test_bYC5rPoNpdrBdlyJfYBFEJ46',
		token: function(token) {}
	});
});