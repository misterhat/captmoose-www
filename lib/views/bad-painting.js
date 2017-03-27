var emoji = require('node-emoji').emoji,
    h = require('hyperscript');

module.exports = function (state, prev, send) {
  return (
    h('div', emoji['no_good'] + ' no way! your moose is soulless ' + emoji.cry +
      '. paint something first!')
  );
};
