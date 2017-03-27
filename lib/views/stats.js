var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    def = require('../../moose.json'),
    statsNav = require('../navigation')[5],
    statsState = require('../states').stats,
    url = require('../url'),

    footer = require('./footer'),
    header = require('./header');

module.exports = function (state, prev, send) {
  if (send && state.nav.title !== statsState.nav.title) {
    send('nav:update', statsState.nav);
  }

  return (
    h('main',
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.columns',
            h('header.heading.column',
              h('h1.title', 'cool numbers about meese'),
              h('h2.subtitle', emoji[statsNav.emoji], ' ',
                               statsNav.attr.title)),
            h('aside.column.is-2',
              h('img', {
                alt: 'image of a lambda symbol',
                src: url + '/lambda.svg',
                style: {
                  'max-height': '150px',
                  height: '100%',
                  width: '100%',
                }
              }))),
          h('hr'))),
      footer(state, prev, send))
  );
};
