UserComments = new Mongo.Collection("usercomments");

// {locationId: String, comments:[{
// 	ownerId: String,
//  ownerName: String,
// 	timestamp: timestamp,
// 	text: String
// }]}