var emoji = require('node-emoji').emoji,
    h = require('hyperscript');

module.exports = function (state, prev, send) {
  var type;

  if (!state.msg || !state.msg.content) {
    return;
  }

  type = state.msg.type;

  return (
    h('.notification' + (type ? '.is-' + type : ''),
      h('button.delete', {
        onclick: function () { send('msg:remove'); },
        title: 'close this box'
      }),
      h('p.content', { innerHTML: state.msg.content }),
      h('p',
        h('button.button.is-info.is-small', {
          onclick: function () { send('msg:remove'); },
          title: 'close this box'
        }, 'understood ', emoji['heavy_check_mark'])))
  );
};
