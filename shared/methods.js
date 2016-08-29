Meteor.methods({
  addComment:function(comment) {
		console.log("addComment method running");
		if(this.userId) {
			comment.createdOn = new Date();
			comment.owner = this.userId;
			console.log("Inserting comment: "+JSON.stringify(comment));
			return Comments.insert(comment);
		}
	},
  'addWebsite'(website) {
    if(this.userId) {
      console.log("Adding new Website: "+ JSON.stringify(website));
      Websites.insert(website);
      // reset Title and Description from addWebsite
      if(isClient) {
        Session.set("WebsiteFormURLTitle", null);
        Session.set("WebsiteFormURLDescription", null);
      }
    } else {
      throw new Meteor.Error("AddWebsite: unauthorized");
    }
  },
  'upVote'(websiteId) {
    if(this.userId) {
      let website = Websites.findOne({_id: websiteId});
      if (!website) {console.log("No website to vote for. Aborting voteUp"); return;}
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
      // pass vote to website collection
      res = Websites.update({_id: websiteId}, {
        $set : {upVotes: voters.upVotes, downVotes:voters.downVotes}},
        {validate: false });
    }
  },
  'downVote'(websiteId) {
    if(this.userId) {
      let website = Websites.findOne({_id: websiteId});
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
      // pass votes to website collections
      res = Websites.update({_id: websiteId}, {
        $set : {upVotes: voters.upVotes, downVotes:voters.downVotes}},
        {validate: false });
    }
  },
});
