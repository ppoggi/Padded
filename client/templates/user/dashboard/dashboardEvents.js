Template.dashboard.events({

    'submit #url_form': function (e) {
        
        e.preventDefault();
        e.stopImmediatePropagation();
        
        var url = e.target.url_input.value;

        if(!url)
            return;
        
        e.target.url_input.value = "";

        var currentList = Session.get('currentListId');
        
        Meteor.call('parseUrl', url, currentList, 1, null); 
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
        Session.set('currentList',this.name);        
        Session.set('currentListId', this._id);
    },

    'click #add-new-list': function(e){

        Meteor.call('createUserList');
    },

    'click .edit-current-group': function(e){
        
        var newName = $('.new-list-name').val();
        $('.new-list-name').val("");
        
        if(!newName || newName== "")
            return;
    
        var currentListId = Session.get("currentListId");
        Session.set("currentList", newName);
        
        Meteor.call('updateListName', currentListId, newName)
    },

    'click #url-form-submit': function(e){
        
        $('#url_form').submit();
    },

    'click #add-roommate-button': function(e){

        var roommate = $('#new-roomate').val();

        if(roommate == "" || roommate == " ")
            return;

        var currentListId = Session.get("currentListId");

        Meteor.call('inviteRoommateToList', roommate, currentListId);
    }

});

    // 'click .image-container': function(e){
    //     e.stopImmediatePropagation();        

    //     if(Session.get("isTablet") && Session.get("isMobile") ){
            
    //         var panels = $(e.target).closest('.row').find('.panel');
                                
    //         $(panels).toggleClass('hidden-xs').toggleClass('hidden-sm');

    //         $('html, body').animate({
    //                 scrollTop: offset.top
    //         }, 1000,);    
    //     }                        
                  
    //     // var offset = $(panels[0]).offset();
        
    //     // if(offset.top < 400)
    //     //     return;

    //     // console.log(offset)


    // },

    // 'mouseenter .image-container': function(e){
        
    //     e.stopImmediatePropagation();        
    //     $(e.target).find('.image-button').each(function(){            
    //         $(this).css({visibility:'visible'});  
    //     })
        
    // },
    // 'mouseleave .image-container': function(e){  

    //     e.stopImmediatePropagation();        
        
    //     $(e.target).find('.image-button').each(function(){            
    //         $(this).css({visibility:'hidden'});  
    //     })

    // },

    // 'click .image-accept':function(e){
    //     e.stopImmediatePropagation();        
    //     Meteor.call("acceptProperty", this._id);

    // },
    
    // 'click .image-decline': function(e){
    //     e.stopImmediatePropagation();        
    //     Meteor.call("declineProperty", this._id);

    // },
