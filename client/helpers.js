/////
// template helpers
/////
Template.registerHelper('formatDate', function(date) {
  return moment(date).fromNow();
});

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
///////////
// website_form
//////////

Template.website_form.helpers({
  urlTitle() {
    return Session.get("WebsiteFormURLTitle");
  },
  urlDescription() {
    return Session.get("WebsiteFormURLDescription");
  }
});

////////
// Website_show
////////
Template.Website_show_page.onCreated(function() {
  this.getWebsiteId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('website', this.getWebsiteId());
    this.subscribe('comments', this.getWebsiteId());
    this.subscribe('allUserData');
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
      website = Websites.findOne({_id: listId});
      website.isDetailed = true;
      return website;
    }
});

Template.insertCommentForm.helpers({
  docid() {
    return FlowRouter.getParam('_id');
  },
  owner:function() { return Meteor.userId;}
});

Template.commentList.helpers({
  getProfilePicture: function(userId) {
    user = Meteor.users.findOne({
      _id: userId
    });
    if(!user) {return;} // no user giving up
    return user.profile.avatar;
  },
  getUsername: function(userId) {
      user = Meteor.users.findOne({
          _id: userId
      });
      console.log(user.profile.username);
      return user.profile.username;
  },
  comments: function() {
    return Comments.find({});
  }
});
