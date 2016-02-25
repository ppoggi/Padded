Template.listViewTemplate.helpers({
	properties: function(list){
		if(!list)
			return;
		
		return list.properties
	},

	detailLink: function(){
		return "/detail/"+this._id;		
	}
})