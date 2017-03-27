var querystring = require('querystring'),

    get = require('simple-get'),

    url = require('../url');

module.exports = {
  namespace: 'look',
  state: {
    country: 'all',
    found: [],
    limit: 10,
    query: null,
    skip: 0,
    sort: null
  },
  reducers: {
    setCriteria: function (state, criteria) {
      state.country = criteria.country;
      state.limit = criteria.limit;
      state.query = criteria.query;
      state.skip = criteria.skip;
      state.sort = criteria.sort;
      return state;
    },
    setFound: function (state, found) {
      state.found = found;
      return state;
    }
  },
  effects: {
    refreshCriteria: function (state, data, send, done) {
      get.concat({
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        },
        json: true,
        url: url + '/look.json?' + querystring.stringify({
          country: state.country,
          limit: state.limit,
          query: state.query,
          skip: state.skip,
          sort: state.sort
        })
      }, function (err, res, found) {
        if (err) {
          return done(err);
        }

        console.log(err, res.statusCode, found);
      });
    },
    search: function (state, data, send, done) {
    }
  },
  subscriptions: {
    init: function (send, done) {
      var href = window.location.href,
          query;

      if (window.location.pathname === '/look') {
        parsed = querystring.parse(href.slice(href.indexOf('?') + 1));

        send('look:setCriteria', {
          country: parsed.country,
          limit: parsed.limit,
          query: parsed.query,
          skip: parsed.skip,
          sort: parsed.sort,
        }, function () {
          send('look:refreshCriteria', done);
        });
      } else {
        send('look:refreshCriteria', done);
      }
    }
  }
};
