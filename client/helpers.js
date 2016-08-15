/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({});
  }
});
Template.website_list.onCreated(function() {
  this.autorun(() => {
    this.subscribe('websites');
    this.subscribe('voters');
  });
});

////////
// Website_item helpers
////////

Template.website_item.helpers({
  'upVotes'() {
    res = Voters.findOne({websiteId:this._id}, {fields: { upVotes: 1}})
    return (res) ? res.upVotes : 0
  },
  'downVotes'() {
    res = Voters.findOne({websiteId:this._id}, {fields: { downVotes: 1}})
    return (res) ? res.downVotes : 0
  },
})
