var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    def = require('../../moose.json'),
    ircNav = require('../navigation')[4],
    ircState = require('../states').irc,
    url = require('../url'),

    footer = require('./footer'),
    header = require('./header'),
    iframe = require('./iframe');

if (typeof window !== 'undefined') {
  process.nextTick(function () {
    var ircFrame = document.getElementById('irc-frame');

    window.onresize = function () {
      var placeholder = document.getElementById('irc');
      iframe.supplant(ircFrame, placeholder);
    };
  });
}

module.exports = function (state, prev, send) {
  if (send && state.nav.title !== ircState.nav.title) {
    send('nav:update', ircState.nav);
  }

  return (
    h('main',
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.columns',
            h('header.heading.column',
              h('h1.title', 'chat w/ friends'),
              h('h2.subtitle', emoji[ircNav.emoji], ' ', ircNav.attr.title)),
            h('aside.column.is-2',
              h('img', {
                alt: 'image of Hestia',
                src: url + '/hestia.svg',
                style: {
                  'max-height': '150px',
                  height: '100%',
                  width: '100%',
                }
              }))),
          h('hr'),
          h('#irc.content.has-text-centered', {
            style: {
              'padding-bottom': '280px',
              'padding-top': '280px'
            }
          }, h('h4', emoji.watch, ' loading IRC webclient...')),
          h('p.notification.is-info',
            'if you wish to chat with us on our ',
            h('abbr', { title: 'internet relay chat' }, 'IRC'),
            ' channel elsewhere, find us at: ',
            h('a', {
              href: def['irc-uri'],
              rel: 'external',
              title: 'the server and channel to connect with'
            }, h('code', def['irc-uri']))))),
      footer(state, prev, send))
  );
};
