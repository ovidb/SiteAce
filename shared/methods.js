Meteor.methods({
  'addWebsite'(website) {
    if(this.userId) {
      console.log("Adding new Website: "+ JSON.stringify(website));
      Websites.insert(website);
    } else {
      throw new Meteor.Error("AddWebsite: unauthorized");
    }
  },
  'upVote'(websiteId) {
    if(this.userId) {
      console.log("Upvoting websiteId:" + websiteId);
      const website = Websites.findOne({_id: websiteId});
      const user = Meteor.user();
      let voters = Voters.findOne({websiteId: website._id});

      if (!voters) {
        voters = {
          websiteId: websiteId,
          upVoters: [],
          downVoters: [],
        };
      } else if (voters.downVoters[user._id]) {
        voters.downVoters.splice(user._id, 1);
      }
      console.log("Assigning voter: "+user);
      voters.upVoters.push(user._id);

      console.log("Voters before insert" + voters);
      Voters.upsert({_id: voters._id}, voters);
    }
  },
  
});
