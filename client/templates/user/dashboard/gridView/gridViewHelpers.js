Template.gridView.helpers({
	properties: function(list){
		if(!list)
			return;
		
		return list.properties
	},

	detailLink: function(){
		if(FlowRouter.getRouteName() == 'realtorDashboard')
			return "/realtor/dashboard/"+FlowRouter.getParam("email")+"/detail/"+this._id;
		else
			return "/detail/"+this._id;		
	}
})