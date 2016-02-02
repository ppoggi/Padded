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

