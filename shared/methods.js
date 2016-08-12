Meteor.methods({
  'addWebsite'(website) {
    if(this.userId) {
      console.log("Adding new Website: "+ JSON.stringify(website));
      Websites.insert(website);
    } else {
      throw new Meteor.Error("AddWebsite: unauthorized");
    }
  },
});
