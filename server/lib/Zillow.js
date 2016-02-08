Zillow = {


	name: "Zillow.com",
	
	getTypeOfProperty: function(urlLink){
		//1 apartment complex
		//2 community
		//3 for sale
		//4 for rent

		if(urlLink.search("/b/") != -1)				
			return 1;

		else if(urlLink.search("/community/") != -1)
			return 2;

		else if(urlLink.search("/for_sale/") != -1)
			return 3;

		else if (urlLink.search("/for_rent/") != -1)
			return 4;

		else 
			return 3;
	},

	scrapeForRent: function($, urlLink){

		var location =  $('head title').text();			

		var locationArray = location.split(',');	
							
		var street = locationArray[0];		

		if(!street)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid street');
														
		var city = locationArray[1]

		if(!city)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid city');
									
		var stateZipArray = locationArray[2].split(' ');			

		var state = stateZipArray[1];
		
		if(!state)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid state');
				
		var zip = stateZipArray[2];
		
		if(!zip)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid Zip');
							
		var price = $('.main-row.home-summary-row span').text().split('/')[0];

		if(price.search(new RegExp("[0-9]")) == -1 )
			price = "Price Unknown"	
	
		if(!price)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid price');
																									 
		var status = "For Rent";
			
		if(!status)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid status');
		
		var details = $('.zsg-list_square.zsg-lg-1-3.zsg-md-1-2.zsg-sm-1-1 li');

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
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid details');		

		var img = $('.hip-photo')['0'];

		if(img)		
			var img = $('.hip-photo')['0'].attribs.src;
		else
			img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
		if(!img)
			throw new Meteor.Error('Error.scrapeResponse', 'ForRent:Invalid img');

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
	},

	scrapeForSale: function($, urlLink){


		var location =  $('head title').text();			

		var locationArray = location.split(',');	
							
		var street = locationArray[0];		

		if(!street)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid street');
								
			
		var cityStateZip  = $('.zsg-h2.addr_city').text();
		
		var city = locationArray[1]

		if(!city)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid city');
									
		var stateZipArray = locationArray[2].split(' ');			

		var state = stateZipArray[1];
		
		if(!state)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid state');
				
		var zip = stateZipArray[2];
		
		if(!zip)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid Zip');
					
		var price = $('.main-row.home-summary-row span').text().split('/')[0];

		if(price.search(new RegExp("[0-9]")) == -1 )
			price = "Price Unknown"	
	
		if(!price)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid price');
																									 
		var status = "For Sale";
			
		if(!status)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid status');
		
		var details = $('.zsg-list_square.zsg-lg-1-3.zsg-md-1-2.zsg-sm-1-1 li');

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
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid details');		

		var img = $('.hip-photo')['0'];

		if(img)		
			var img = $('.hip-photo')['0'].attribs.src;
		else
			img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
		if(!img)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid img');

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


	},

	scrapeCommunity: function($, urlLink){
		
		var location 	  =  $('h1').text();			

		var locationArray = location.split(',');	

		var street = " "
									
		if(!street)
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid street');
										
		var cityStateZip = $('.zsg-h2.addr_city').text();
		
		var city = locationArray[1]


		if(!city)
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid city');
											
		var state = locationArray[2];
		if(!state)
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid state');
		
		
		var zip = " ";
		
		if(!zip)
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid Zip');
					
		var price = $('.status-icon-row.for-sale-row.home-summary-row span').text().split('/')[0];

		if(price.search(new RegExp("[0-9]")) == -1 )
			price = "Price Unknown"
	
		if(!price)
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid price');
																									 
		var status = "For Sale";
			
		if(!status)
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid status');
		
		var details = $('.zsg-list_square.zsg-lg-1-3.zsg-md-1-2.zsg-sm-1-1 li');

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
			throw new Meteor.Error('Error.scrapeResponse', 'Community:Invalid detiails');		
		
		var img = $('.hip-photo')['0'];

		if(img)		
			var img = $('.hip-photo')['0'].attribs.src;
		else
			img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
		if(!img)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid img');

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

	},

	scrapeApartmentBuilding: function($, urlLink){


		var location 	  =  $('.zsg-h5').text();			

		var locationArray = location.split(',');	

		var street = locationArray[0];

		if(!street)
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid street');
		
		var city  = locationArray[1];


		if(!city)
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid city');
					
		locationArray = locationArray[2].split(" ");
				
		var state = locationArray[1];

		if(!state)
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid state');
		
		var zip   = locationArray[2];

		if(!zip)
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid Zip');
					
		var price = $('.min-price').text().split('/')[0];

		if(price.search(new RegExp("[0-9]")) == -1 )
			price = "Price Unknown"	
		
		if(!price)
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid price');
																									
					
		var status = "For Rent";
			
		if(!status)
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid status');
		
		var details = $('.amenity-headline')



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
			throw new Meteor.Error('Error.scrapeResponse', 'ApartmentBuilding:Invalid detiails');		

		var img = $('.hip-photo')['0'];

		if(img)		
			var img = $('.hip-photo')['0'].attribs.src;
		else
			img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
		if(!img)
			throw new Meteor.Error('Error.scrapeResponse', 'ForSale:Invalid img');

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
	},
	
	scrapeResponse : function(response, urlLink){
	
		var type = this.getTypeOfProperty(urlLink)

		if(!type)
			throw new Meteor.Error('Zillow.scrapeResponse','Invalid scraper');

		$ = cheerio.load(response.content);	

		var scrapeObj;

		if(type == 1)
			scrapeObj = this.scrapeApartmentBuilding($, urlLink);		
		else if(type == 2)
			scrapeObj = this.scrapeCommunity($, urlLink);
		else if(type == 3)
			scrapeObj = this.scrapeForSale($,urlLink);
		else if(type == 4)
			scrapeObj = this.scrapeForRent($,urlLink);
		
		return scrapeObj;
			
	}

}