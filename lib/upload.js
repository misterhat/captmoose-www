// upload a moose to the server from the browser via xhr. used in the make
// model.

var h = require('hyperscript'),
    emoji = require('node-emoji').emoji,
    get = require('simple-get'),

    url = require('./url'),
    validate = require('./validate');


function tryOr(fn, args, or) {
  var res;

  try {
    res = fn.apply(null, args);
  } catch (e) {
    res = or;
  }

  return res;
}

function mooseLink(name) {
  return h('a', {
    href: url + '/look/' + name,
    style: {
      'text-decoration': 'underline',
      color: '#fff',
    },
    title: 'visit ' + name + ' in the forest'
  }, h('em', name));
}

module.exports = function (state, fields, send, done) {
  var error, throttle;

  fields.name = fields.name.trim().replace(/ /g, '-').toLowerCase();
  fields.painting = tryOr(JSON.parse, [ fields.painting ], [[]]);
  error = validate.form(fields);
  fields.painting = tryOr(JSON.stringify, [ fields.painting ], '[[]]');

  if (error) {
    error = error().outerHTML;
    return send('msg:update', { content: error, type: 'danger' }, done);
  }

  send('identity:refreshToken', function () {
    send('make:setSending', true, function () {
      get.concat({
        form: fields,
        json: true,
        method: 'post',
        url: url + '/make'
      }, function (err, res, body) {
        var message = {
          content: null,
          type: null
        };

        if (err) {
          message.type = 'danger';
          message.content = h('span',
                              emoji.sob, ' uh-oh, there was a problem: ',
                              h('code', err.message), '. ',
                              'maybe try again later?').outerHTML;
        } else {
          message.type = /^2/.test(res.statusCode) ? 'success' : 'danger';

          if (res.statusCode === 429) {
            message.content = emoji.stopwatch + ' slow down, speed-racer ' +
                              emoji['racing_car'] + '! just wait another ' +
                              body + ' seconds...';
          } else if (res.statusCode === 409) {
            message.content = h('span',
                                emoji['no_good'] + ' the name ',
                                mooseLink(fields.name), ' is already taken. ',
                                'pick a new one!').outerHTML;
          } else if (/^4/.test(res.statusCode)) {
            message.content = body;
          } else if (message.type === 'success') {
            message.content = h('span',
                                emoji['hugging_face'], ' congratulations, ',
                                'your ', mooseLink(fields.name), ' moose is ',
                                'safe. great work!').outerHTML;
          }
        }

        send('msg:update', message, function () {
          if (!err && res.statusCode === 429) {
            clearTimeout(throttle);

            throttle = setTimeout(function () {
              send('make:setSending', false, function () {
                  send('msg:remove', done);
              });
            }, body * 1000);

            return;
          }

          send('make:setSending', false, done);
        });
      });
    });
  });
}
