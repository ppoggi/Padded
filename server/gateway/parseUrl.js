Meteor.methods({
	parseUrl: function(url, callback){	

		var userId = Meteor.userId();
		
		if(!userId)
			throw new Meteor.Error('Meteor.methods.parseUrl','err');							

		var scraper = LibHelpers.checkUrl(url);

		if(!scraper){
			callback('Invalid String');
			return;
		}

		HTTP.call("GET", url, (err, response) => {
			
			if(err){
				
				throw new Meteor.Error('Meteor.methods.parseUrl','err');							
			}									

			var scrapedListing = scraper.scrapeResponse(response, url);

			var property = PropertyActions.checkProperty(scrapedListing);

			UserActions.updateDash(userId, property);			
		});

	}
});

