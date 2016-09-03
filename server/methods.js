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
});
