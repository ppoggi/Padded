Meteor.methods({
	parseUrl: function(url, listId, callback){	
		
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

			UserActions.updateDash(userId, property, listId);			
		});

	}
});

