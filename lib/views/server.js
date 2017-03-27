var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    hashes = require('../hashes'),
    pkg = require('../../package.json'),
    url = require('../url');

module.exports = function (template) {
  return function (state) {
    var title = '';

    if (state) {
        title = (state.nav.title + ' captmoose!').trim();
    }

    return '<!doctype html>' + (
      h('html', { lang: 'en' },
        h('head',
          h('meta', { charset: 'utf-8' }),
          h('meta', {
            content: 'width=device-width, initial-scale=1',
            name: 'viewport',
          }),
          h('meta', {
            content: pkg.name + ' - ' + pkg.version,
            name: 'title'
          }),
          h('meta', {
            content: pkg.author,
            name: 'author'
          }),
          h('meta', {
            name: 'description',
            content: pkg.description + '. ' + pkg.repository.url.slice(4, -4)
          }),
          h('title', title),
          h('link', {
            href: url + '/' + hashes['build/bundle.min.css'],
            rel: 'stylesheet',
            type: 'text/css',
          })),
        h('body',
          h('section.hero.is-warning',
            h('.hero-body',
              h('.container',
                h('h1.title', emoji['no_entry'], '\xa0no javascript :('),
                h('h2.subtitle',
                  h('a', { href: 'http://enable-javascript.com/' },
                    'javascript should be enabled for the ',
                    h('em', 'full'), ' moose experience.'), ' ',
                    h('a', {
                        href: 'https://www.gnu.org/software/librejs/'
                    }, emoji.sunglasses, ' captain moose respects your ',
                      'freedom!'),
                    ' ',
                    h('a', {
                        href: 'https://www.mozilla.org/en-US/firefox/new/'
                    }, emoji.fire, ' install mozilla\'s firefox browser.'))))),
          template,
          h('script', { src: url + '/' + hashes['build/bundle.min.js'] })))
    ).outerHTML.replace(/\n/g, ' ');
  };
};
