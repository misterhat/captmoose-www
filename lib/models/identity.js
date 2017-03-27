// stores the CSRF token
// https://www.owasp.org/index.php/CSRF_Prevention_Cheat_Sheet#Synchronizer_.28CSRF.29_Tokens

var get = require('simple-get'),

    url = require('../url');

module.exports = {
  namespace: 'identity',
  state: {
    token: null
  },
  reducers: {
    setToken: function (state, token) {
      state.token = token;
      return state;
    }
  },
  effects: {
    refreshToken: function (state, data, send, done) {
      get.concat({
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        },
        json: true,
        url: url + '/token.json'
      }, function (err, res, token) {
        if (err) {
          return done(err);
        }

        send('identity:setToken', token, done);
      });
    }
  },
  subscriptions: {
    init: function (send, done) {
      send('identity:refreshToken', done);
    }
  }
};
