var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    def = require('../../moose.json'),
    makeNav = require('../navigation')[1],
    makeState = require('../states').make,
    url = require('../url'),

    footer = require('./footer'),
    header = require('./header'),
    palette = require('./palette'),
    save = require('./save'),
    tools = require('./tools');

var ARROWS = [ 'up', 'down', 'left', 'right' ];

module.exports = function (state, prev, send) {
  var isFirefox = false,
      painterDom = '';

  if (send && state.nav.title !== makeState.nav.title) {
    send('nav:update', makeState.nav);
  }

  if (!process.browser || typeof window === 'undefined') {
    state.make = makeState.make;
    state.identity = {};
  } else {
    isFirefox = /firefox/i.test(window.navigator.userAgent);
  }

  painterDom = state.make.painter.dom;

  return (
    h('main',
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.columns',
            h('header.heading.column',
              h('h1.title', 'make a moose'),
              h('h2.subtitle', emoji[makeNav.emoji], ' ', makeNav.attr.title)),
            h('aside.column.is-2',
              h('img', {
                alt: 'image of Venus',
                src: url + '/venus.svg',
                style: {
                  'max-height': '150px',
                  height: '100%',
                  width: '100%',
                }
              }))),
          h('hr'),
          h('.columns',
            h('aside.column.is-one-third.menu',
              h('p.menu-label', emoji.wrench, ' tools'),
              tools(state, prev, send),
              h('p.menu-label', emoji.rainbow, ' palette'),
              palette(state, prev, send),
              h('.is-hidden-mobile',
                h('p.menu-label', emoji.keyboard, ' keyboard shortcuts'),
                h('.message',
                  h('p.message-body.has-text-centered',
                    h('code',
                      '[alt] + ',
                      (isFirefox ? '[shift] + ' : ''),
                      '[',
                      h('strong', {
                        title: 'text prefixed bold is a keyboard shortcut'
                      }, '<shortcut>'), ']'),
                    h('br'),
                    h('code', ARROWS.map(function (a) {
                      return '[' + emoji['arrow_' + a] + '], ';
                    }), '[space]'))))),
            h('.column',
              h('figure.easel.shadow', painterDom),
              h('br'),
              save(state, prev, send))))),
        footer(state, prev, send))
  );
};
