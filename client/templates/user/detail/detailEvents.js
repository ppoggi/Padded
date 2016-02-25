Template.detail.events({
	'submit form': function(e){
				
		e.preventDefault();
		
		var propertyId = FlowRouter.getParam('id');
		
        var currentList = Session.get('currentListId');
        
        var text = e.target.comment.value;

		if(text == "" ||  text.search("{") != -1)
			return;

		Meteor.call("insertComment", currentList, propertyId, text);
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