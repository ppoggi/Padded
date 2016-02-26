Template.dashboard.helpers({

	isDetail: function(){

		var routeName = FlowRouter.getRouteName();
		if(routeName == "detail")
			
			return true
		
		return false;
	},
	
	listView: function(){

		return Session.get("listView");
	},

	imageTile: function(){

		return Session.get("imageTile");
	},

	detailList: function(){
		
		return Session.get("detailList");		
	},

	activeList: function(lists){
		
		var currentList = Session.get('currentList');		

		if(!lists && !currentList)
			return "Loading..."


		if(!lists )
			return "Loading.."

		lists = lists.fetch();
		
 		if(!lists[0])
 			return "Loading."

		var name;
		
		if(!currentList){
			name = lists[0].name;
			Session.set('currentList', name);
			Session.set('currentListId', lists[0]._id);
			
		}else
			name= currentList;			
		
		return name;
	},

	list: function(){
		
		var currentListId = Session.get('currentListId');

		return UserLists.findOne({_id:currentListId, owners: Meteor.userId()});
	},

	lists: function(){
		return UserLists.find();
	}
});
