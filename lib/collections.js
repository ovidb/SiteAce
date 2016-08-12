Websites = new Mongo.Collection("websites");
Voters = new Mongo.Collection("voters");

Websites.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Site address",
    max: 200
  },
  url:{
    type: String,
    label: "Comment",
    max: 1000
  },
  description:{
  	type: String,
    label: "Description",
    max: 1000
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
}));
