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
        Session.set('calendar', false);
        Session.set('guide', false);
    },

    'click .image-tile-btn': function(e){
        
        Session.set('listView', false);
        Session.set('imageTile', true);
        Session.set('detailList', false);
        Session.set('calendar', false);
        Session.set('guide', false);
    },

    'click .detail-list-btn': function(){        
        
        Session.set('listView', false);
        Session.set('imageTile', false);
        Session.set('detailList', true);
        Session.set('calendar', false);
        Session.set('guide', false);

    },

    'click .calendar-btn': function(){

        Session.set('listView', false);
        Session.set('imageTile', false);
        Session.set('detailList', false);
        Session.set('calendar', true);
        Session.set('guide', false);
    },

    'click .guide-btn': function(){

        Session.set('listView', false);
        Session.set('imageTile', false);
        Session.set('detailList', false);
        Session.set('calendar', false);
        Session.set('guide', true);
    },

    'click .list-name-li': function(e){
        
        e.preventDefault();                
        
        Session.set("currentList",this.name);
        Session.set('currentListId', this._id);
    },

    'click #realtor-add-property-input': function(){
        $('#url_form').submit();
    }

});