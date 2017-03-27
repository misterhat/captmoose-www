var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    validate = require('../validate');

module.exports = function (state, prev, send) {
  var comment = emoji.flashlight + ' look for meese...';

  return h('input.input', {
    attrs: { maxlength: validate.maxlength },
    name: 'query',
    placeholder: comment,
    title: comment,
    type: 'search'
  });
};
