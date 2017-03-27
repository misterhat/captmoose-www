// an embeddable moose card

var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    reactions = require('../reactions'),
    url = require('../url');

module.exports = function (moose) {
  return function (state, prev, send) {
    return (
      h('.card',
        h('header.card-header',
          h('p.card-header-title', emoji['flag-ca'], ' ', moose.name)),
        h('.card-content',
          h('.content.has-text-centered',
            h('figure',
              h('img.pixelate.zoomable', {
                alt: moose.name + ' image',
                height: 150,
                src: url + '/look/' + moose.name + '.png',
                width: 208
              })),
            h('br'),
            reactions.map(function (reaction) {
              return h('button.button', {
                style: { margin: '2px' },
                title: reaction.replace(/_/g, ' ')
              }, emoji[reaction]);
            }))))
    );
  };
};
