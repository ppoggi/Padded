LibHelpers = {

	checkUrl : function(url){
		
		var isTrulia = url.search(new RegExp("www.trulia.com")); 

		if(isTrulia != -1)
			return  Trulia;

		var isZillow = url.search(new RegExp("www.zillow.com"));

		if(isZillow != -1)
			return  Zillow;		

		var isRealtorCom = url.search(new RegExp("www.realtor.com"));

		if(isRealtorCom != -1)
			return RealtorCom;

		return null;		
	
	}
}