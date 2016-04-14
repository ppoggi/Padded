Meteor.methods({

    createStripeUser: function(){

    },

    addUserStripeToken: function(token){

        var user = Meteor.user();

        if(!user)
            throw new Meteor.Error('StripeGateway.addUserStripeToken', 'Must Be Logged In');

        StripeActions.createStripeUser(user, token);
    },

  // 'chargeCard': function(stripeToken) {
  //   //var Stripe = StripeAPI(StripeKeys.secret);

  //   Stripe.charges.create({
  //     amount: 1000,
  //     currency: 'usd',
  //     source: stripeToken
  //   }, function(err, charge) {
  //     console.log(err, charge);
  //   });
  // }
});