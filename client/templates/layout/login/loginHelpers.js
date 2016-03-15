Template.login.helpers({
	'isNewLogin': function(){
		var isNew = Session.get('isNewLogin');
		if(isNew)
			return true;
		else 
			return false
	}
});