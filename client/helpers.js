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
    // We pass `list` (which contains the full list, with all fields, as a function
    // because we want to control reactivity. When you check a todo item, the
    // `list.incompleteCount` changes. If we didn't do this the entire list would
    // re-render whenever you checked an item. By isolating the reactiviy on the list
    // to the area that cares about it, we stop it from happening.
    website() {
      const instance = Template.instance();
      const listId = instance.getWebsiteId();
      return Websites.findOne({_id: listId});
    }
});
