Template.detail.events({
	'submit form': function(e){
				
		e.preventDefault();

		var listnumber = FlowRouter.getParam("listNumber");
		var propertyId = FlowRouter.getParam("id");

		var location = {listNumber: listnumber, propertyId: propertyId}
		var text = e.target.comment.value;

		if(text == "" ||  text.search("{") != -1)
			return;//TODO generate error

		Meteor.call("insertComment", text, location);
	},
	'click .link-back-detail':function(e){
        
        e.preventDefault();         
        
        window.open(e.currentTarget.href)
    },

})