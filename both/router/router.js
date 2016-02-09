FlowRouter.route('/', {    
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



FlowRouter.route('/:listId', {
    name:"genericList",
    action:function(){              
        BlazeLayout.render('open', {content: 'genericList'});           
    }    
});