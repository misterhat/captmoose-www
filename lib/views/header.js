var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    navigation = require('../navigation'),
    pkg = require('../../package.json'),
    search = require('./search'),
    url = require('../url'),
    validate = require('../validate');

navigation = navigation.map(function (item) {
  item.attr.href = url + '/' + item.attr.href;
  return item;
});

var IS_DEV = process.env.NODE_ENV !== 'production',
    TAR = pkg.name + '-' + pkg.version + '.tgz';

var srcItem;

if (!IS_DEV) {
  srcItem = h('a.nav-item', {
    attrs: { 'data-no-routing': true },
    href: url + '/build/' + TAR,
    title: 'download a copy!'
  }, emoji['floppy_disk'] + '\xa0src');
}

module.exports = function (state, prev, send) {
  var active = state ? state.nav.active : null;

  return (
    h('nav.nav',
      h('.nav-left',
        h('a.nav-item', {
          href: url,
          title: 'captmoose.club'
        },
          h('img.pixelate', {
            alt: 'logo',
            src: url + '/moose.png'
          }))),
      h('.nav-right',
        navigation.map(function (item) {
          var href = '/' + item.attr.href.replace(/^.+\//, ''),
              isActive = (active === href ? '.is-active' : ''),
              title = (href === '/' ? 'home' : href.slice(1));

          return h('a.nav-item.is-tab' + isActive, item.attr, emoji[item.emoji],
                   '\xa0' + title);
        }),
        srcItem,
        h('form.is-hidden-touch', {
          action: url + '/look',
          method: 'get'
        }, h('span.nav-item', search(state, prev, send)))))
  );
};
