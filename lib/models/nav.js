// used for defining the active page and title

var states = require('../states');

module.exports = {
  namespace: 'nav',
  state: states.home.nav,
  reducers: {
    update: function (state, data) {
      document.title = ((data.title || '') + ' captmoose!').trim();
      return {
        active: data.active,
        title: data.title
      };
    }
  }
};
