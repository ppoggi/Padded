FlowRouter.route('/', {
    name: "home",    
    action:function(){    	        
    	BlazeLayout.render('main', {content: 'dashboard'});    	 
    }    
});

FlowRouter.route('/detail/:listNumber/:id', {
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
    action: function(){
        BlazeLayout.render('main', {content: 'realtorDash'});
    }
});

FlowRouter.route('/realtor/dashboard/:email/detail/:listNumber/:id', {
    action: function(){
        name:"realtorDetail",
        BlazeLayout.render('main', {content: 'realtorDash'});
    }
});


FlowRouter.route('/:listId', {
    name:"genericList",
    action:function(){              
        BlazeLayout.render('open', {content: 'genericList'});           
    }    
});