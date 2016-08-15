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
      const website = Websites.findOne({_id: websiteId});
      const user = Meteor.user();
      let voters = Voters.findOne({websiteId: website._id});
      // if no one voted on the current site create
      // voters object
      if (!voters) {
        voters = {
          websiteId: websiteId,
          upVoters: [],
          upVotes: 0,
          downVoters: [],
          downVotes: 0
        };
      }
      // did current user already voted up
      if (voters.upVoters.indexOf(user._id) > -1) { return; }
      // did user voted down? remove it
      if (voters.downVoters.indexOf(user._id) > -1) {
        voters.downVoters.splice(user._id, 1);
        voters.downVotes -= 1;
      }
      // vote up
      voters.upVoters.push(user._id);
      voters.upVotes += 1;
      Voters.upsert({_id: voters._id}, voters);
    }
  },
  'downVote'(websiteId) {
    if(this.userId) {
      const website = Websites.findOne({_id: websiteId});
      const user = Meteor.user();
      let voters = Voters.findOne({websiteId: website._id});

      if (!voters) {
        voters = {
          websiteId: websiteId,
          upVoters: [],
          upVotes: 0,
          downVoters: [],
          downVotes: 0
        };
      }
      // did current user already voted up
      if (voters.downVoters.indexOf(user._id) > -1) { return; }
      // did user voted down? remove it
      if (voters.upVoters.indexOf(user._id) > -1) {
        voters.upVoters.splice(user._id, 1);
        voters.upVotes -= 1;
      }
      voters.downVoters.push(user._id);
      voters.downVotes += 1;

      Voters.upsert({_id: voters._id}, voters);
    }
  },
});
