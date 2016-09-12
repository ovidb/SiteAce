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
  'getRecommendedWebsites'() {
    let userList = Voters.aggregate([
      {$match: {upVoters: this.userId}},
      {$project: {_id: 0, upVoters: 1}},
      {$unwind: "$upVoters"},
      {$group:{_id: "$upVoters", count: {$sum: 1}}},
      {$sort:{count:-1}}
    ]);
    console.log(userList);
  }
});

