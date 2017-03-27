// server-sided routes.

var emoji = require('node-emoji').emoji,

    getSend = require('../send-body'),
    lookRoute = require('./look'),
    makeRoute = require('./make'),
    states = require('../states'),
    sumReq = require('../sum-req'),
    views = require('../views');

function getSecret(req) {
  return (req.session && req.session.secret ? req.session.secret : null);
}

module.exports = function (db, tokens, log) {
  var make = {},
      send = getSend(log);

  function notFound(req, res) {
    res.statusCode = 404;
    send.view(req, res, views['404'], states['404']);
  }

  // fetched and stored in the browser state for form submission
  function csrfToken(req, res) {
    var secret, token;

    if (!/^xmlhttprequest$/i.test(req.headers['x-requested-with'])) {
      return notFound(req, res);
    }

    secret = getSecret(req);

    if (!secret) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'visit realm="' + url + '"');
      return send.json(req, res, 'no "session" cookie');
    }

    token = tokens.create(secret);
    send.json(req, res, token);
  }

  return [
    [ '/404', notFound ],
    [ '/', function (req, res) {
      send.view(req, res, views.home, states.home);
    } ],
    [ '/favourites', function (req, res) {
      send.view(req, res, views.favourites, states.favourites);
    } ],
    [ '/info', function (req, res) {
      send.view(req, res, views.info, states.info);
    } ],
    [ '/irc', function (req, res) {
      send.view(req, res, views.irc, states.irc);
    } ],
    lookRoute(db, tokens, log),
    makeRoute(db, tokens, log),
    [ '/stats', function (req, res) {
      send.view(req, res, views.stats, states.stats);
    } ],
    [ '/token.json', csrfToken ],
  ];
};
