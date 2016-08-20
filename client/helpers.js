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
  });
});

////////
// Website_show
////////
Template.Website_show_page.onCreated(function() {
  this.getWebsiteId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('website', this.getWebsiteId());
  });
});

Template.Website_show_page.helpers({
    websiteReady: ()=> {
      const instance = Template.instance();
      return instance.subscriptionsReady()
    },

    website() {
      const instance = Template.instance();
      const listId = instance.getWebsiteId();
      return Websites.findOne({_id: listId});
    }
});
