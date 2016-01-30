Template.dashboard.events({
    'submit #url_form': function (e) {
        
        e.preventDefault();
        e.stopImmediatePropagation();
        //needs to be checked via regex
        var url = e.target.url_input.value;

        Meteor.call("parseUrl", url, function(err, response){
        
            if(err)
                console.log(err)
            else if(response)
                console.log(response)
        });     
    },

    'mouseenter .image-container': function(e){
        
        e.stopImmediatePropagation();        
        $(e.target).find('.image-button').each(function(){            
            $(this).css({visibility:'visible'});  
        })
        
    },
    'mouseleave .image-container': function(e){  

        e.stopImmediatePropagation();        
        
        $(e.target).find('.image-button').each(function(){            
            $(this).css({visibility:'hidden'});  
        })

    },

    'click .image-accept':function(e){
        e.stopImmediatePropagation();        
        Meteor.call("acceptProperty", this._id);

    },
    'click .image-decline': function(e){
        e.stopImmediatePropagation();        
        Meteor.call("declineProperty", this._id);

    },
    'click .link-back':function(e){
        e.preventDefault();        
        window.open(this.urlLink)
    }

});
