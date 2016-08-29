/////
// template events
/////

Template.website_item.events({
  "click .js-upvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    const website_id = this._id;
    Meteor.call("upVote", website_id);
    return false;// prevent the button from reloading the page
  },
  "click .js-downvote":function(event){

    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    const website_id = this._id;
    Meteor.call("downVote", website_id);
    return false;// prevent the button from reloading the page
  }
})

Template.website_form.events({
  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');
  },
  "click .js-get-title":function(event){
    //empty Title and Description
    Session.set("WebsiteFormURLTitle", null);
    Session.set("WebsiteFormURLDescription", null);

    //set references to form elements
    const urlFormGroup = $('.js-add-url').parent();
    const urlHelpBlock = $('.js-add-url').siblings('.help-block');
    const urlInput = $('.js-add-url');

    //parse URL
    let url = $('.js-add-url').val();
    url = parseURL(url);

    // check for URL validity
    let validURL = isValidURL(url);
    if (!validURL) {
      // inform user that the url is invalid
      urlFormGroup.addClass("has-error");
      urlHelpBlock.html("Url is not valid");
      return false;
    } else {
      //remove all error messages from url input
      urlFormGroup.removeClass("has-error");
      urlHelpBlock.html("");
      urlInput.val(url);

      //try to fetch the title and description
      //bypassing SOP with 'http://alloworigin.com/get?url='
      $.getJSON('http://alloworigin.com/get?url='+url, function(data){
        if(data) {
          //find title
          urlTitle = data.contents.match(/<title>(.*?)<\/title>/);
          //find description
          urlDescription = data.contents.match(/<meta name=\"description\" content=\"(.*?)\"\/>/);

          //rectively set title if found
          if(urlTitle) {
            Session.set("WebsiteFormURLTitle", urlTitle[1]);
          }
          //rectively set description if found
          if(urlDescription) {
            Session.set("WebsiteFormURLDescription", urlDescription[1]);
          }
        }
      });
    }
  },

});
//parseURL helper function
function parseURL(url) {
  if(url.startsWith('http://')) {return url;}
  if(url.startsWith('https://')) {return url;}

  return 'http://' + url;
}

//regex check for URL validity helper function
function isValidURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}
