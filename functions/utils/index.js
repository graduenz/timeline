module.exports = {
  getId: function(urlPath) {
    return urlPath.match(/([^/]*)\/*$/)[0];
  },

  userOwns: function(item, user) {
    return item.data.user_id === user.sub;
  }
}