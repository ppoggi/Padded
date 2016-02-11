Template.bottomNav.events({
	'click .glyphicon-list-alt': function(){
		
		FlowRouter.go("/");
	},
	'click .glyphicon.glyphicon-user': function(){
		
		FlowRouter.go("/profile");
	}
});