LibHelpers = {

	checkUrl : function(url){
		
		var isTrulia = url.search(new RegExp("trulia")); 

		if(isTrulia != -1)
			return  Trulia;

		var isZillow = url.search(new RegExp("zillow"));

		if(isZillow != -1)
			return  Zillow;			
	
	}
}