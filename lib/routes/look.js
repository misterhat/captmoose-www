var fs = require('fs'),

    dbActions = require('../db-actions'),
    getSend = require('../send-body'),
    states = require('../states'),
    sumReq = require('../sum-req'),
    views = require('../views');

var MISSING_PNG = fs.readFileSync(__dirname + '/../../assets/missing.png');

module.exports = function (db, tokens, log) {
  var routes = [],
      send = getSend(log);

  routes.push([
    '/look',
    function (req, res) {
      send.view(req, res, views.look, states.look);
    }
  ]);

  routes.push([
    '/look/:name',
    function (req, res, params) {
      var name = params.name;

      if (/\.png$/.test(name)) {
        name = name.replace(/\.png$/, '');
        res.setHeader('content-type', 'image/png');

        dbActions.grabPng(db, name, function (err, png) {
          if (err) {
            log.error(sumReq(req), err);
            res.statusCode = 500;
          }

          if (!png) {
            res.statusCode = 404;
            res.end(MISSING_PNG);
          } else {
            res.end(png);
          }
        });
      } else if (/\.json$/.test(name)) {
        name = name.replace(/\.json$/, '');

        dbActions.grabPainting(db, name, function (err, painting) {
          if (err) {
            log.error(sumReq(req), err);
            res.statusCode = 500;
          }

          if (!painting) {
            res.statusCode = 404;
            res.end('null');
          } else {
            send.json(req, res, painting);
          }
        });
      }
    }
  ]);

  return routes;
};
