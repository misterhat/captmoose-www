var formBody = require('body/form'),

    dbActions = require('../db-actions'),
    getSend = require('../send-body'),
    states = require('../states'),
    sumReq = require('../sum-req'),
    validate = require('../validate'),
    views = require('../views');

var IS_DEV = process.env.NODE_ENV !== 'production';

function getSecret(req) {
  return (req.session && req.session.secret ? req.session.secret : null);
}

module.exports = function (db, tokens, log) {
  var route = {},
      send = getSend(log);

  route.get = function (req, res) {
    send.view(req, res, views.make, states.make);
  };

  route.post = function (req, res) {
    formBody(req, function (err, body) {
      var formError, ip;

      if (err) {
        return send.error(req, res, 500, err);
      }

      if (!tokens.verify(getSecret(req), body.token)) {
        log.info(sumReq(req), 'bad csrf token');
        res.statusCode = 401;
        return send.json(req, res, 'bad csrf token. resend!');
      }

      try {
        body.painting = JSON.parse(body.painting);
      } catch (e) {
        log.error(sumReq(req), e);
        // https://stackoverflow.com/questions/4781187
        res.statusCode = 422;
        return send.json(req, res, null);
      }

      formError = validate.form(body);

      // this shouldn't happen if the client is validating
      if (formError) {
        log.info(sumReq(req), 'bad form');
        res.statusCode = 400;
        return send.json(req, res, formError().outerHTML);
      }

      if (IS_DEV && req.session.randomIp) {
        ip = req.session.randomIp;
      } else {
        ip = req.connection.remoteAddress;
      }

      dbActions.shouldThrottleMake(db, ip, function (err, latest) {
        if (err) {
          log.error(sumReq(req), err);
          res.statusCode = 500;
          return send.json(req, res, null);
        }

        if (latest <= 30) {
          res.statusCode = 429;
          return send.json(req, res, 30 - latest);
        }

        dbActions.isMooseFree(db, body.name, function (err, free) {
          if (err) {
            res.statusCode = 500;
            return send.json(req, res, err);
          }

          if (!free) {
            res.statusCode = 409;
            return send.json(req, res, null);
          }

          dbActions.saveMoose(db, {
            'user_agent': req.headers['user-agent'],
            ip: ip,
            name: body.name,
            painting: body.painting
          }, function (err) {
            if (err) {
                log.error(sumReq(req), err);
                res.statusCode = 500;
            }

            return send.json(req, res, null);
          });
        });
      });
    });
  };

  return [ '/make', route ];
};
