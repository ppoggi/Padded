Template.realtorDetail.events({
	'submit form': function(e){
				
		e.preventDefault();

		var listnumber = FlowRouter.getParam("listNumber");
		var propertyId = FlowRouter.getParam("id");
		var email      = FlowRouter.getParam("email");

		var location = {listNumber: listnumber, propertyId: propertyId}
		
		var text = e.target.comment.value;

		if(text == "" ||  text.search("{") != -1)
			return;//TODO generate error

		Meteor.call("realtorInsertComment", email, text, location);
	},
	'click .link-back-detail':function(e){
        
        e.preventDefault();         
        
        window.open(e.currentTarget.href)
    },

})