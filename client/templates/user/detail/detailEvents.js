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

    'click #accept-property': function(e){
    	
    	Meteor.call('likeProperty', this);
    },

    'click .image-button-column.decline li a.decline': function(e){
    	
    	e.preventDefault();
    	
    	Meteor.call('declineProperty', this);

    }
})