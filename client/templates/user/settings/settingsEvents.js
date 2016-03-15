Template.settings.events({
	'click .tab-link': function(e){

		e.preventDefault();
		$('.left-tabulus .active').removeClass('active')
		$(e.currentTarget.parentElement).addClass('active');
		$('.tabs_container .show').removeClass('show').addClass('hidden');
		$('#'+e.currentTarget.pathname.slice(1)).removeClass('hidden').addClass('show');

		$('.fc-day').popover('destroy');
		$('.fc-content').popover('destroy');
	},

	'click .tab-2': function(e){
		
		$('#availabilityCalendar').fullCalendar('render');		
	}
});