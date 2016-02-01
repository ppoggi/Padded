FlowRouter.route('/', {    
    action:function(){    	
    	BlazeLayout.render('main', {content: 'dashboard'});    	 
    }    
});


FlowRouter.route('/saved', {    
    action:function(){    	
    	BlazeLayout.render('main', {content: 'history'});    	 
    }    
});


FlowRouter.route('/removed', {    
    action:function(){    	
    	BlazeLayout.render('main', {content: 'history'});    	 
    }    
});