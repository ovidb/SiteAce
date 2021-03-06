Websites = new Mongo.Collection("websites");
Voters = new Mongo.Collection("voters");

Websites.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Site title",
    max: 200
  },
  url:{
    type: String,
    label: "Url",
    max: 1000
  },
  description:{
  	type: String,
    label: "Description",
    max: 1000
  },
  upVotes: {
    type: Number,
    optional: true
  },
  downVotes: {
    type: Number,
    optional: true
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

Comments = new Mongo.Collection("comments");
Comments.attachSchema(new SimpleSchema({
  body:{
    type: String,
    label: "Comment",
    max: 1000
  },
  docid:{
  	type: String,
  },
  owner:{
    optional: true,
  	type: String,
  },
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
}));
