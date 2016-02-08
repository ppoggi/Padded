Template.realtor.helpers({
	
	profile: function(){

		return Realtors.findOne({});		
	},
	genericList: function(list){
		
		if(!list)
			return;

		return list.reverse();
	}
});