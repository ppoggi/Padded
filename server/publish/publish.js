Meteor.publish('dashboard', function(){

	return UserDash.find({owner: this.userId});
});


