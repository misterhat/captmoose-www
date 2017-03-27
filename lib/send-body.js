// send compressed (if possible) views and JSON to the web browser from the
// server.

var crypto = require('crypto'),
    zlib = require('zlib'),

    serverWrap = require('./views/server'),
    sumReq = require('./sum-req');

var IS_DEV = process.env.NODE_ENV !== 'production',
    // https://serverfault.com/questions/253074/452642#452642
    LEVEL = 2;

function canCompress(req) {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
  var acceptEncoding = req.headers['accept-encoding'] || '';
  return /gzip/.test(acceptEncoding);
}

module.exports = function (log) {
  function sendCompressed(req, res, data, done) {
    done = typeof done === 'function' ? done : function () { };

    if (!canCompress(req)) {
      res.end(data);
      return done();
    }

    zlib.gzip(data, { level: LEVEL }, function (err, gzipped) {
      if (err) {
        log.error(sumReq(req), err);
        res.end(null);
        return done();
      }

      res.setHeader('Content-Encoding', 'gzip');
      res.end(gzipped);
      return done();
    });
  }

  function sendJson(req, res, obj) {
    var json;

    res.setHeader('Content-Type', 'application/javascript');

    try {
      json = JSON.stringify(obj, null, IS_DEV ? '  ' : '');
    } catch (e) {
      log.error(sumReq(req), e);
      json = 'null';
      res.statusCode = 500;
    }

    sendCompressed(req, res, json);
  }

  function sendView(req, res, view, state) {
    view = view(state);
    res.setHeader('Content-Type', 'text/html');
    sendCompressed(req, res, serverWrap(view)(state));
  }

  return {
    json: sendJson,
    view: sendView,
  };
};
