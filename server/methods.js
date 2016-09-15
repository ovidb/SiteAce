Meteor.methods({
  'getHTMLfromURL'(url) {
    console.log("getHTMLfromURL on server");
    if(this.userId) {
      result = HTTP.get(url);
      if (result) {
        console.log("result:" + result);
        return result;
      }
    }
  },
  'getRecommendedWebsitesIds'() {
    let websites = [];
    let userList = Voters.aggregate([
      {$match: {upVoters: this.userId}},
      {$project: {_id: 0, upVoters: 1}},
      {$unwind: "$upVoters"},
      {$group:{_id: "$upVoters", count: {$sum: 1}}},
      {$sort:{count:-1}}
    ]);
    userList.shift();

    //get websites ranked user voted for
    for (var e of userList) {
      //get websites
      let website = Voters.find(
        {upVoters: {$eq: e._id, $ne: this.userId}},
        {fields: {websiteId:1, _id:0}},
        {sort: {upVotes: -1}}

        ).fetch();
      if(website) {
        console.log("WB"+JSON.stringify(website));
        websites = websites.concat(website);
      }
    }
    let websitesId = []
    websites.forEach((e)=> {
      websitesId.push(e.websiteId);
    });

    return websitesId;
  }
});

