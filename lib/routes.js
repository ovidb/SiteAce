FlowRouter.route('/', {
  name: 'Websites.list',
  action(params, queryParams) {
    BlazeLayout.render('App_body', {main: 'Websites_list'});
  }
});

FlowRouter.route('/website/:_id', {
  name: 'Website.show',
  action(params, queryParams) {
    BlazeLayout.render('App_body', {main: 'Website_show'});
  }
});
