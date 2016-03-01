Template.realtorDash.events({

	    'submit #url_form': function (e) {
        
        e.preventDefault();
        e.stopImmediatePropagation();        
    
        var url = e.target.url_input.value;

        if(!url)
            return;
        
        e.target.url_input.value = "";
        
        var currentListId = Session.get("currentListId");
        var currentListName = Session.get("currentList");
        
        Meteor.call("parseUrl", url, currentListId, 3, currentListName);
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
    },

    'click #realtor-add-property-input': function(){
        $('#url_form').submit();
    }

});