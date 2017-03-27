// view for the LibreJS license table
// https://www.gnu.org/licenses/javascript-labels.html

var h = require('hyperscript'),

    hashes = require('../hashes'),
    url = require('../url');

var IS_DEV = process.env.NODE_ENV !== 'production';

function row(file, source) {
  return (
    h('tr',
      h('td',
        h('a', {
          attrs: { 'data-no-routing': true },
          disabled: (IS_DEV ? 'disabled' : null),
          href: url + '/' + file,
          title: 'minified ' + file
        }, file)),
      h('td',
        h('a', {
          attrs: { 'data-no-routing': true },
          href: url + '/COPYING.txt',
          title: 'GNU Affero General Public License version 3 or greater'
        }, 'AGPL-3.0+')),
      h('td',
        h('a', {
          attrs: { 'data-no-routing': true },
          href: url + '/' + source,
          title: 'unminified ' + source
        }, source)))
  );
}

module.exports = function (state, prev, send) {
  return [
    h('h2',
      h('a', {
        href: 'https://www.gnu.org/software/librejs/manual/librejs.html' +
              '#JavaScript-Web-Labels',
        rel: 'external'
      }, '#jslicense-labels1')),
    h('p.has-text-centered',
      h('a', {
        href: 'https://www.gnu.org/software/librejs/',
        rel: 'external',
        title: 'install the LibreJS Firefox extension'
      }, h('img', {
        alt: 'librejs logo',
        src: url + '/librejs.png'
      }))),
    h('table.table#jslicense-labels1',
      h('thead',
        h('tr',
          h('th', { style: { width: '60%' } }, 'minified'),
          h('th', { style: { width: '10%' } }, 'license'),
          h('th', { style: { width: '30%' } }, 'unminified'))),
      h('tbody',
        row(hashes['build/bundle.min.js'], 'build/bundle.js')))
  ];
};
