var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    infoNav = require('../navigation')[6],
    infoState = require('../states').info,
    pkg = require('../../package.json'),
    url = require('../url'),

    footer = require('./footer'),
    header = require('./header'),
    librejs = require('./librejs'),
    readme = require('./readme')();

var FSF_URL = 'https://www.fsf.org/blogs/community/user-liberation-watch-and-' +
              'share-our-new-video';

module.exports = function (state, prev, send) {
  var deps = [];

  if (send && state.nav.title !== infoState.nav.title) {
    send('nav:update', infoState.nav);
  }

  Array.prototype.push.apply(deps, Object.keys(pkg.dependencies));
  Array.prototype.push.apply(deps, Object.keys(pkg.devDependencies));
  deps.sort();

  return (
    h('main',
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.columns',
            h('header.heading.column',
              h('h1.title', 'read about captmoose'),
              h('h2.subtitle', emoji[infoNav.emoji], ' ', infoNav.attr.title)),
            h('aside.column.is-2',
              h('img', {
                alt: 'image of Athena',
                src: url + '/athena.svg',
                style: {
                  'max-height': '150px',
                  height: '100%',
                  width: '100%',
                }
              }))),
          h('hr'),
          h('.content',
            h('h2',
              h('a', {
                href: 'https://fsf.org/about/',
                rel: 'external'
              },
                h('abbr', { title: 'free software foundation' }, 'fsf'),
                '.org: liberating computer users ',
                emoji['statue_of_liberty'])),
            h('video.image.is-16-by-9.video', {
              controls: 'controls',
              poster: url + '/fsf-poster.jpg',
              src: 'https://static.fsf.org/nosvn/FSF30-video/FSF_30_720p.webm'
            }),
            h('br'),
            h('blockquote', {
              cite: FSF_URL
            },
              h('p',
                'Most people interact with free software every day, but many ',
                'of those people don\'t know what free software is or why ',
                'they should go out of their way to use it. We want to fix ',
                'that (and we think you do too), so we commissioned a short ',
                'video that makes free software easy for everyone to ',
                'understand.'),
              h('footer',
                h('p',
                  ' - Free Software Foundation\'s ',
                  h('a', {
                    href: FSF_URL,
                    rel: 'external',
                    title: 'FSF: User Liberation: Watch and share our new video'
                  },
                    h('em',
                      'User Liberation: Watch and share our new video ',
                      '(2014)'))))),
            librejs(state, prev, send),
            h('blockquote',
              'GNU LibreJS aims to address the JavaScript problem described ',
              'in Richard Stallman\'s article ',
              h('a', {
                href: 'http://www.gnu.org/philosophy/javascript-trap.html',
                rel: 'external'
              }, 'The JavaScript Trap'), '. ',
              'LibreJS is a free add-on for GNU IceCat and other ',
              'Mozilla-based browsers. It blocks nonfree nontrivial ',
              'JavaScript while allowing JavaScript that is free and/or ',
              'trivial.'),
            h('hr'),
            readme(state, prev, send),
            h('h2', 'dependencies ', emoji.gift),
            h('p', deps.length, ' pieces of free software I glued together to ',
              'make ', pkg.name, ' work:'),
            h('ul',
              deps.map(function (dep) {
                return h('li',
                  h('a', {
                    href: 'https://npmjs.org/package/' + dep,
                    rel: 'external'
                  }, dep));
              }))))),
      footer(state, prev, send))
  );
};
