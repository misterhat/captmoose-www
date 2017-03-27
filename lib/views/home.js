var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    navigation = require('../navigation'),
    pkg = require('../../package.json'),
    states = require('../states'),
    url = require('../url'),

    animalNumber = require('./animal-number'),
    footer = require('./footer'),
    header = require('./header');

module.exports = function (state, prev, send) {
    if (send && state.nav.title !== states.home.nav.title) {
        send('nav:update', states.home.nav);
    }

    return (
        h('main',
          header(state),
          h('section.hero.is-dark.heading-image.outline', {
            style: {
              'background-image': 'url(' + url + '/forest.svg)'
            }
          },
            h('.hero-body',
              h('.container',
                h('.columns',
                  h('header.column',
                    h('h1.title',
                      h('a', {
                        href: url
                      }, 'captmoose.club')),
                    h('h2.subtitle', emoji['lower_left_paintbrush'], ' ',
                                     pkg.description)))))),
          h('section.section',
            h('.container',
              h('header.content.has-text-centered',
                h('h1', animalNumber(1234567890)),
                h('h3',
                  h('img.pixelate', {
                    alt: 'logo',
                    src: url + '/moose.png'
                  }), ' ',
                  'meese roaming around the forest ',
                  emoji['evergreen_tree'], ' ',
                  h('a',
                    navigation[1].attr,
                    'make another ', emoji.art))),
              h('hr'),
              h('.columns',
                h('.column.is-2.is-hidden-mobile',
                  h('img', {
                    alt: 'an evergreen tree',
                    src: url + '/evergreen.svg',
                    style: { height: '100%' }
                  })),
                h('.column.content.has-text-centered',
                  h('h3', {
                    title: 'my biased picks'
                  }, emoji.pushpin, ' sticky meese'),
                  h('h3', {
                    title: 'complete chaos!'
                  }, emoji.question, ' random meese'),
                  h('h3',
                    emoji.baby, ' ',
                    h('a', {
                      href: url + '/look',
                      title: 'awh, how adorable ' + emoji['sweat_smile'],
                    }, 'baby meese')),
                  h('h3',
                    emoji['camera_with_flash'], ' ',
                    h('a', {
                      href: url + '/look?sort=famous',
                      title: 'smug but pretty ' + emoji.smirk
                    }, 'famous meese')),
                  h('h3',
                    emoji.thumbsup, ' ',
                    h('a', {
                      href: url + '/look?sort=best',
                      title: 'loved ' + emoji.heart
                    }, 'best meese')),
                  h('h3',
                    emoji['middle_finger'], ' ',
                    h('a', {
                      href: url + '/look?sort=worst',
                      title: 'unloved ' + emoji.frowning
                    }, 'worst meese')))))),
          footer(state))
    );
};
