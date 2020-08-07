module.exports = {
  getId: function(urlPath) {
    return urlPath.match(/([^/]*)\/*$/)[0];
  },

  userOwns: function(item, user) {
    if (!user) return false;
    return item.data.user_id === user.sub;
  }
}