Template.realtorDetail.events({
	'submit form': function(e){
				
		e.preventDefault();
		
		var propertyId = FlowRouter.getParam('id');
		
        var currentList = Session.get('currentListId');
        
        var text = e.target.comment.value;

		if(text == "" ||  text.search("{") != -1)
			return;

		console.log(currentList, propertyId, text)

		Meteor.call("insertComment", currentList, propertyId, text);
	},
	'click .link-back-detail':function(e){
        
        e.preventDefault();         
        
        window.open(e.currentTarget.href)
    },

})