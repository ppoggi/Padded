Template.realtorGeneric.events({
	    'submit #url_form': function (e) {
        
        e.preventDefault();
        e.stopImmediatePropagation();
        //needs to be checked via regex        
        var url = e.target.text.value;

        if(!url)
            return;
        
        e.target.text.value = "";
        
        var listId = FlowRouter.getParam("listId");

        Meteor.call("parseUrl", url, listId, 2)        
    }
});