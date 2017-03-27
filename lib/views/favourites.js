var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    def = require('../../moose.json'),
    favouritesNav = require('../navigation')[3],
    favouritesState = require('../states').favourites,
    lookNav = require('../navigation')[2],
    url = require('../url'),

    footer = require('./footer'),
    header = require('./header');

module.exports = function (state, prev, send) {
  if (send && state.nav.title !== favouritesState.nav.title) {
    send('nav:update', favouritesState.nav);
  }

  return (
    h('main',
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.columns',
            h('header.heading.column',
              h('h1.title', 'your favourite meese'),
              h('h2.subtitle', emoji[favouritesNav.emoji], ' ',
                               favouritesNav.attr.title)),
            h('aside.column.is-2',
              h('img', {
                alt: 'image of Eros & Psyche',
                src: url + '/eros-psyche.svg',
                style: {
                  'max-height': '150px',
                  height: '100%',
                  width: '100%',
                }
              }))),
          h('hr'),
          h('.content.has-text-centered',
            h('h4',
              emoji.expressionless, ' you\'ve got no favourites. ',
              h('a', {
                href: '/look',
                title: lookNav.attr.title
              },
                emoji.eyes, ' go look for some (use ', emoji.heartpulse,
                ')!'))))),
      footer(state, prev, send))
  );
};
