DateHelpers = {

	formatDate: function(timestamp){
		
		if(!timestamp)
			return;
		
		var now = Date.now();
		var diff =  now - timestamp;	

		var minutes = Math.floor(diff/60000);

		if(minutes < 60){			
			var post = minutes == 1 ? " minute ago" : " minutes ago";			
			return minutes+post;
		}
		
		if(minutes < 60 * 24){
			var hours = Math.floor(minutes/ 60);
			var post = hours == 1 ? " hour ago" : " hours ago";
			return hours+post;			
		}

		if(minutes > 60 * 24 ){
			var days = Math.floor((minutes/ 60)/24);
			var post = days == 1 ? " day ago" : " days ago";
			return days+post;
		}

		return this.dateString(timestamp);		
	},
	
	dateString: function(timestamp){
		
		if(!timestamp)
	      return null;

	    var date = new Date(timestamp);
	    var hour = date.getHours();
	    var noon;
	    
	    if(hour > 12)
	      noon = "P.M.";
	    else
	      noon = "A.M.";

	    hour = hour % 12;

	    if(hour == 0)
	      hour = 12;

	    var month = date.getMonth() + 1;

	    var minutes = date.getMinutes();

	    if(parseInt(minutes) < 10){
	      minutes = '0'+minutes 
	    }

	    var year = date.getYear() +""; 
	    year = year.slice(1);

    	return month +'/'+ date.getDate() +'/'+ year +', '+ hour +':'+ minutes +' '+noon; 	
    }
}