Meteor.methods({
	parseUrl: function(url, listId, method, email){	
			
		var userId = Meteor.userId();
		
		if(!userId)
			throw new Meteor.Error('Meteor.methods.parseUrl','err');							

		var scraper = LibHelpers.checkUrl(url);

		if(!scraper)
			throw new Meteor.Error('Meteor.methods.parseUrl', 'Invalid Url')			
		

		HTTP.call("GET", url, (err, response) => {
			
			if(err){
				
				throw new Meteor.Error('Meteor.methods.parseUrl','err');							
			}									

			var scrapedListing = scraper.scrapeResponse(response, url);			

			var property = PropertyActions.checkProperty(scrapedListing);			
			
			if(method == 1)				
				UserActions.updateDash(userId, property, listId);			

			else if(method == 2)
				RealtorActions.updateGenericListProperty(userId, property, listId);
			
			else if (method == 3)
				RealtorActions.updateClientDash(userId, property, email, listId);
		});	

	}
});

