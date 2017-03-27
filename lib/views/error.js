var h = require('hyperscript'),

    url = require('../url');

module.exports = function (error) {
  return function () {
    return (
      h('figure.image.is-16by9',
        h('a', { href: '/', title: error + '? take me home!' },
          h('img', { src: url + '/error.gif', alt: 'officer barbrady' })))
    );
  }
};
