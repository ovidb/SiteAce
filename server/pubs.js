Meteor.publish("websites", function() {
	return Websites.find();
});
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'profile': 1}});
});
