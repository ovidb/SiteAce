/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({}, {sort:{upVotes: -1, downVotes: 1}});
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

})
