Template.alerts.events({

	'click .alert-accept': function(e){
        
        e.stopImmediatePropagation(e);               

        AlertHandler.checkAlert(this);         
    },

    'click .alert-decline': function(e){
        
        e.stopImmediatePropagation(e);        
             
         Meteor.call("removeNotification", this);
    },
})