var emoji = require('node-emoji').emoji,
    h = require('hyperscript');

module.exports = function (state, prev, send) {
  return (
    h('div',
      emoji['no_good'] + ' no way! names may include letters, numbers, ' +
      'spaces or emoji. please use at least three! examples:',
      h('ul',
        h('li', 'mickey moose'),
        h('li',  emoji['cat2'] + 's ' + emoji.heart + ' ' +
                 emoji['ice_hockey_stick_and_puck']),
        h('li', '5up3r 5t4r ' + emoji.star)))
  );
};
