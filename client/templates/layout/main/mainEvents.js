Template.main.events({
	'click .try-pro-cta.hdn': function(e){

		e.stopImmediatePropagation();		
		$('.try-pro-cta').removeClass('hdn');
		$('.try-pro-window.hidden').removeClass('hidden');
	},
	'click .try-pro-cta': function(e){

		e.stopImmediatePropagation();	
		$('.try-pro-cta').addClass('hdn');
		$('.try-pro-window').addClass('hidden');
	}
})


//for Development

Template.main.events({

	'click #createRealtor': function(e){

		e.preventDefault();
		
		$('.try-pro-cta').addClass('hdn');
		$('.try-pro-window').addClass('hidden');
		
		Meteor.call('createRealtor');		
	}
});