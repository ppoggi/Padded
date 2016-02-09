Meteor.methods({
	parseUrl: function(url, listId, method, callback){	

		//need to check list IDs for valid ids -top securty issue
		 // if(listId != "0" || listId != "1" || listId !="2" || listId !="3" || listId!="4")
			// throw new Meteor.Error('Meteor.methods.parseUrl','Invlid ListId');
		
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
			else if(method == 2){
				//TODO check if realtor
				RealtorActions.updateGenericListProperty(userId, property, listId);
			}
		});	

	}
});

