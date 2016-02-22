RealtorCom = {

	name:"Realtor.com",

	scrapeResponse : function(response, urlLink){

		$ = cheerio.load(response.content);	

		var status = $('.listing-header-main').text();
		
		if(status.search(new RegExp("Rent")) != -1)
			status = "For Rent";
		else if(status.search(new RegExp("Sale")) != -1)
			status = "For Sale";

		if(!status)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid status');

		var street = $('h1 span:first-child').text();
		
		if(!street)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid street');		

		var price = $('.ldp-header-price div span:first-child').text();
		
		if(price.search(new RegExp("[0-9]")) == -1 )
			price = "Price Unknown"	

		if(!price)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid price');

		var city;
		var state;
		var zip;

		if(status =="For Rent"){
			var city = $('h1 span:nth-child(3)').text().trim();		
		
			if(!city)
				throw new Meteor.Error('Error.scrapeResponse', 'Invalid city');
		
			var state = $('h1 span:nth-child(4)').text().trim();		 
			
			if(!state)
				throw new Meteor.Error('Error.scrapeResponse', 'Invalid state');				

			var zip = $('h1 span:nth-child(5)').text().trim();			

			if(!zip)
				throw new Meteor.Error('Error.scrapeResponse', 'Invalid Zip');

		}else{

			var city = $('h1 span:nth-child(2)').text().trim();		
		
			if(!city)
				throw new Meteor.Error('Error.scrapeResponse', 'Invalid city');
		
			var state = $('h1 span:nth-child(3)').text().trim();		 
			
			if(!state)
				throw new Meteor.Error('Error.scrapeResponse', 'Invalid state');				

			var zip = $('h1 span:nth-child(4)').text().trim();			

			if(!zip)
				throw new Meteor.Error('Error.scrapeResponse', 'Invalid Zip');
		
		}			
							
		var details = $('#ldp-detail-features li')

		var detailText = [];

		for(detail in details){
			if(details[detail]){	
				if(details[detail].children){			
					if(typeof details[detail].children[0].data =="string")
						detailText.push(details[detail].children[0].data)
				}
			}			
		}									
		details = detailText;
		
		if(!details)
			throw new Meteor.Error('Error.scrapeResponse', 'Invalid detiails');		

		var img = $('img')['0'].attribs.src +"";
				
		if(!img)
			img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";

		return {
			street       : street,
			price        : price,
			city         : city,
			state        : state,
			zip          : zip,			
			status       : status,
			details      : details,
			img          : img,
			urlName      : this.name,
			urlLink      : urlLink
		}	
			
	}
}