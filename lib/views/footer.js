var emoji = require('node-emoji').emoji,
    emojify = require('node-emoji').emojify,
    h = require('hyperscript'),

    credits = require('../credits'),
    pkg = require('../../package.json'),
    url = require('../url');

module.exports = function () {
  return (
    h('footer.footer',
      h('.container',
        h('.content.has-text-centered',
          h('p.is-medium',
            h('a', {
              href: pkg.repository.url.slice(4, -4),
              rel: 'external',
              title: 'fork it!'
            }, h('strong', emoji['fork_and_knife'] + ' ' + pkg.name)),
            ' by ',
            h('a', {
              href: 'https://github.com/misterhat',
              rel: 'external',
            },
            emoji['maple_leaf'], ' misterhat'),
            ' with ',
            h('a', {
              href: 'https://vid.me/5lkQ',
              rel: 'external',
              title: 'the only catalyst for change is...'
            }, emoji.heart), ', ',
            emoji['four_leaf_clover'], ' and ', emoji.coffee, '.'),
          h('p',
            'this program is ',
            h('a', {
              href: 'https://www.gnu.org/philosophy/free-sw.en.html',
              rel: 'external',
              title: 'freedom to run, copy, distribute, study, change and ' +
                     'improve the software'
            }, 'free software'), ' ',
            '(' + emoji['statue_of_liberty'], ' not ', emoji.dollar, ')',
            ': you can redistribute it ' +
            'and/or modify it under the terms of the ',
            h('a', {
              attrs: { 'data-no-routing': true },
              href: url + '/COPYING.txt'
            }, 'GNU Affero General Public License'),
            ' as published by the ',
            h('a', {
              href: 'https://fsf.org',
              rel: 'external'
            }, 'Free Software Foundation'),
            ', either version 3 of the license, or (at your option) ' +
            'any later version. ',
            h('del', h('small', h('a', {
              href: 'https://www.youtube.com/watch?v=twAyI4LPk0Y',
              rel: 'external',
              title: 'retracted.'
            },
              'learn the terrifying truth behind free software ', emoji.scream,
              '!')))),
          h('p',
            'moose pictures licensed under the ',
            h('a', {
              attrs: { 'data-no-routing': true },
              href: url + '/CC-BY-SA-4.0.txt',
              title: 'Creative Commons Attribution-ShareAlike 4.0'
            }, 'Creative Commons Attribution-ShareAlike 4.0'), '. ',
            'feel free to modify, redistribute and/or sell them, but share ',
            'the same freedoms you were granted!'),
          h('hr'),
          h('p',
            h('a', {
              href: 'http://choo.io',
              rel: 'external',
              title: 'i choo-choo-choose you! ' + emoji.heart
            }, emoji['steam_locomotive'] + emoji.train + emoji.train +
               emoji.train + emoji.train + emoji.train)),
          h('.columns',
            credits.map(function (item) {
              var img = item.image;

              item.attr.rel = 'external';
              item.attr.title = emojify(item.attr.title);

              return (
                h('.column',
                  h('a.faded', item.attr,
                    h('img', {
                      alt: img + ' logo',
                      src: url + '/credits/' + img + '.png',
                      style: { 'max-height': '64px' }
                    })))
              );
            })))))
  );
};
