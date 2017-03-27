var h = require('hyperscript'),

    def = require('../../moose.json');

var SHORTCUTS = [ '~', '!', '@', '#', '$', '%', 'q', 'w', 'y', 'a', 's', 'h',
                  'z', 'x', 'c', 'v' ];

module.exports = function (state, prev, send) {
  var colour = state.make.colour - 1;

  return h('figure.palette.shadow',
    def.palette.slice(1).map(function (c, i) {
      var isActive = colour === i ? '.using' : '';

      return h('button.is-link.swatch.outline' + isActive, {
        attrs: { accesskey: SHORTCUTS[i] || '' },
        onclick: function () { send('make:setColour', i + 1); },
        style: { 'background-color': c },
        title: 'switch to ' + c,
      }, SHORTCUTS[i] || '\xa0');
    }));
};
