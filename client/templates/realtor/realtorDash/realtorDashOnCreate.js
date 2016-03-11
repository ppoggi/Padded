Template.realtorDash.onCreated(function(){


	var handle = this.subscribe('realtorData');
	
	this.autorun( ()=>{    			  
		
		if (handle.ready()){

			var email = FlowRouter.getParam('email');

			var clients = Meteor.user().realtorData.clients;

			var clientId;

			for(var i = 0; i < clients.length; i++){
				if(clients[i].email == email){
					clientId = clients[i].clientId;
					i = clients.length;
				}
			}

			this.subscribe('realtorDash', clientId);	
		}
		
	}); 


	Session.set('listView', true);
    Session.set('imageTile', false);
    Session.set('detailList', false);
    Session.set('currentList', null);
    Session.set('calendar', false);
    Session.set('guide', false);
         
});

 Template.realtorDash.rendered = function() {


 };