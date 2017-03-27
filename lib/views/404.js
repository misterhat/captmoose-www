var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    states = require('../states.json'),

    error = require('./error')('nothing to see here'),
    footer = require('./footer'),
    header = require('./header'),
    url = require('../url');

module.exports = function (state, prev, send) {
  if (send && state.nav.title !== states['404'].nav.title) {
    send('nav:update', states['404'].nav);
  }

  return (
    h('main',
      h('audio#move-along', {
        src: url + '/move-along.mp3',
        style: { display: 'none' }
      }),
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.content.notification.is-warning',
            h('h2', {
              onclick: function () {
                document.getElementById('move-along').play();
              }
            }, 'error 404: nothing to see here ', h('strong', emoji.confused)),
            error(state, prev, send)))),
      footer(state, prev, send))
  );
};
