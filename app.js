// our webserver!

var cluster = require('cluster'),
    http = require('http'),
    os = require('os'),

    Tokens = require('csrf'),
    bunyan = require('bunyan'),
    ecstatic = require('ecstatic'),
    knex = require('knex'),
    randomIpv6 = require('random-ipv6'),
    serverRouter = require('server-router'),
    sessions = require('client-sessions'),
    tcpBind = require('tcp-bind'),

    def = require('./moose.json'),
    getRoutes = require('./lib/routes'),
    knexFile = require('./knexfile'),
    pkg = require('./package.json'),
    sessionSecret = require('./lib/secret'),
    sumReq = require('./lib/sum-req'),
    url = require('./lib/url');

var IS_DEV = process.env.NODE_ENV !== 'production',
    ONE_DAY = 60 * 60 * 24,
    ONE_YEAR = ONE_DAY * 365;

var db = knex(knexFile[(IS_DEV ? 'development' : 'production')]),
    log = bunyan({ name: pkg.name }),
    serve = ecstatic({
      cache: (IS_DEV ? 0 : ONE_YEAR),
      gzip: true,
      handleError: false,
      root: __dirname + '/assets',
      serverHeader: false,
      showDir: false
    }),
    session = sessions({
      cookieName: 'session',
      duration: ONE_DAY,
      secret: sessionSecret
    }),
    tokens = new Tokens(),
    routes = getRoutes(db, tokens, log),
    router, fd, server;

if (IS_DEV) {
  db.on('query', function (query) {
    log.info('query:', query.sql, query.bindings);
  });
}

router = serverRouter(routes);

server = http.createServer(function (req, res) {
  // https://www.owasp.org/index.php/OWASP_Secure_Headers_Project
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1');

  serve(req, res, function () {
    res.statusCode = 200;

    session(req, res, function () {
      if (IS_DEV && !req.session.randomIp) {
        req.session.randomIp = randomIpv6();
      }

      if (req.session.secret) {
        router(req, res);
      } else {
        tokens.secret(function (err, secret) {
            if (err) {
                log.error(sumReq(req), err);
                res.statusCode = 500;
                return res.end(null);
            }

            req.session.secret = secret;

            router(req, res);
        });
      }
    });
  });
});

server.on('error', function (e) {
  log.fatal(e);
});

if (cluster.isMaster) {
  log.info('%s mode under %s', IS_DEV ? 'development' : 'production',
           process.env.USER);
  log.info('it\'s alive! http' + (def.port === 443 ? 's' : '') + ':' + url);

  os.cpus().forEach(function () {
      cluster.fork();
  });

  cluster.on('online', function (worker) {
    log.info('worker %d spawned', worker.process.pid);
  });

  cluster.on('exit', function (worker, code, signal) {
    log.error('worker %d: died with code %d', worker.process.pid, code);
    cluster.fork();
  });

  return;
}

// drop to a different user (useful for running under port 80, using non-root)
if (def.uid && def.gid) {
  fd = tcpBind(def.port);

  try {
    process.setgid(def.gid);
    process.setuid(def.uid);
  } catch (e) {
    log.fatal(e);
    process.exit(1);
  }

  log.info('switched to user ' + process.env.USER);
  server.listen({ fd: fd });
} else {
  if (!IS_DEV && process.env.USER === 'root') {
    log.warn('set uid & gid to non-root for your safety');
  }

  server.listen({ port: def.port });
}
