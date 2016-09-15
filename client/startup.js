Meteor.setInterval(()=>{
  Meteor.call("getRecommendedWebsitesIds", (err,res)=> {
    console.log("Autorunning ..")
    if (err) {
      console.log(err);
    } else {
      Session.set("recommendedWebsites", res);
    }
  });
}, 10000);