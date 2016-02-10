Template.realtorDash.events({

	    'submit #url_form': function (e) {
        
        e.preventDefault();
        e.stopImmediatePropagation();        
    
        var url = e.target.url_input.value;

        if(!url)
            return;
        
        e.target.url_input.value = "";
        
        var currentList = Session.get("currentList");
        
        var email = FlowRouter.getParam("email")

        Meteor.call("parseUrl", url, currentList, 3, email);
    },
    
    'click .link-back':function(e){
        e.preventDefault();          
        window.open(this.urlLink)
    },
    
    'click .list-btn': function(e){
        
        Session.set('listView', true);
        Session.set('imageTile', false);
        Session.set('detailList', false);
    },

    'click .image-tile-btn': function(e){
        
        Session.set('listView', false);
        Session.set('imageTile', true);
        Session.set('detailList', false);
    },

    'click .detail-list-btn': function(){        
        
        Session.set('listView', false);
        Session.set('imageTile', false);
        Session.set('detailList', true);

    },

    'click .list-name-li': function(e){
        
        e.preventDefault();
        
        Session.set("currentList",this.value)
    }
});