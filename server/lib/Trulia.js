Trulia = {

	name:"Trulia.com",

	scrapeResponse : function(response, urlLink){
		
			
		$ = cheerio.load(response.content);	

		var street = $('.headingDoubleSuper.h2.typeWeightNormal.mvn.ptn').text();
		if(!street)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid street');
		
		var price = $('.h2.typeReversed.typeDeemphasize.man.pan.noWrap').text();
		if(!price)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid price');
			
		var city = $('.headlineDoubleSub span:nth-child(1)').text().trim();		
		if(!city)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid city');

		var state = $('.headlineDoubleSub span:nth-child(2)').text().trim();		 
		if(!state)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid state');
		
		var zip = $('.headlineDoubleSub span:nth-child(3)').text().trim();
		if(!zip)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid Zip');
		 
		var neighborhood = $('.headlineDoubleSub span:nth-child(4)').text().trim();
		// if(!neighborhood)
		// 	throw new Meteor.Error('Error.scrapeResponse', 'Invalid neighborhood');		
					
		var status = $('.typeLowlight.h7 div a:nth-child(1)').text();	
		if(!status)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid status');
		
		var details = $('.listingDetails').text();
		if(!details)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid detiails');		

		var img = $('.photoPlayerCurrentItem')['0'].attribs.style +"";
		img = img.slice(22);
		img = img.slice(0,-3);
				
		if(!img)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid img');

		return {
			street       : street,
			price        : price,
			city         : city,
			state        : state,
			zip          : zip,
			neighborhood : neighborhood,
			status       : status,
			details      : details,
			img          : img,
			urlName      : this.name,
			urlLink      : urlLink
		}	
			
	}
}