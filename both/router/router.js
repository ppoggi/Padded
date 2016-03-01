FlowRouter.route('/', {
    name: "home",    
    action:function(){    	        
    	BlazeLayout.render('main', {content: 'dashboard'});    	 
    }    
});

FlowRouter.route('/detail/:id', {
	name:"detail",
    action:function(){    	    	
    	BlazeLayout.render('main', {content: 'dashboard'});      	  	
    }    
});

FlowRouter.route('/realtor', {
	name:"realtor",
    action:function(){    	    	
    	BlazeLayout.render('main', {content: 'realtor'});      	  	
    }    
});

FlowRouter.route('/realtor/generic/:listId', {
    name:"realtor",
    action:function(){              
        BlazeLayout.render('main', {content: 'realtorGeneric'});           
    }    
});

FlowRouter.route('/realtor/dashboard/:email', {
    name: "realtorDashboard",
    action: function(){
        BlazeLayout.render('main', {content: 'realtorDash'});
    }
});

FlowRouter.route('/realtor/dashboard/:email/detail/:id', {
    name:"realtorDetail",
    action: function(){        
        BlazeLayout.render('main', {content: 'realtorDash'});
    }
});

FlowRouter.route('/settings', {
    name:"settings",
    action:function(){              
        BlazeLayout.render('main', {content: 'settings'});           
    }    
});

//open
FlowRouter.route('/:listId', {
    name:"genericList",
    action:function(){              
        BlazeLayout.render('open', {content: 'genericList'});           
    }    
});

