Template.alerts.events({

	'click .alert-accept': function(e){
        
        e.stopImmediatePropagation(e);                
                
         Meteor.call("clientAccept", this);
    },

    'click .alert-decline': function(e){
        
        e.stopImmediatePropagation(e);        
                
         Meteor.call("clientDecline", this);
    },
})