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
  });
});
