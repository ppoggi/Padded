LibHelpers = {

	checkUrl : function(url){

		//check for trulia		

		var isTrulia = url.search(new RegExp("trulia")); 

		if(isTrulia != -1)
			return  Trulia;


		//needs more
	}
}