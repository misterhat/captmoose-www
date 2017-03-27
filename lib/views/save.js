var emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    def = require ('../../moose'),
    formatName = require('../format-name'),
    url = require('../url'),

    msg = require('./msg'),
    shortcut = require('./shortcut');

module.exports = function (state, prev, send) {
  var sending = state.make.sending,
      nameInput;

  if (process.browser && typeof document !== 'undefined') {
    nameInput = document.querySelector('input[name="name"]');

    if (nameInput) {
      nameInput.value = state.make.name;
    }
  }

  function upload() {
    var fields = {},
        inputs = document.querySelectorAll('form input');

    Array.prototype.forEach.call(inputs, function (input) {
      fields[input.name] = input.value;
    });

    send('make:upload', fields);
  }

  return (
    h('div',
      msg(state, prev, send),
      h('form', {
        action: url + '/make',
        attrs: { onsubmit: 'event.preventDefault()' },
        method: 'post',
        onsubmit: upload
      },
        h('input', {
          type: 'hidden',
          name: 'painting',
          value: state.make.painting
        }),
        h('input', {
          type: 'hidden',
          name: 'token',
          value: state.identity.token
        }),
        h('.columns',
          h('p.control.column.is-6.is-offset-1',
              h('input#moose-name.input', {
                attrs: { maxlength: 50 },
                name: 'name',
                onchange: function () {
                  send('make:setName', this.value.trim());
                },
                onkeyup: function () {
                  this.value = formatName(this.value);
                },
                placeholder: emoji.baby + ' name your moose...',
                required: 'required',
                title: 'name your moose',
                type: 'text',
                value: state.make.name
              })),
          h('p.control.column.is-4',
            h('button.button.is-fullwidth', {
              attrs: { accesskey: 'm' },
              onclick: function () {
                send('make:randomName');
              },
              title: 'can\'t think of a name?',
              type: 'button'
            }, shortcut('question', 'make one up')))),
        h('.columns',
          h('.column.is-4.is-offset-4.has-text-centered',
            h('figure',
              h('img.pixelate.zoomable', {
                alt: 'your moose preview',
                height: def.height * 10,
                src: (state.make.paintingUri || url + '/missing.png'),
                width: def.width * 8
              })))),
        h('.columns',
          h('p.control.column.is-4.control.is-offset-2',
            h('button.button.is-fullwidth.is-success', {
              attrs: { accesskey: 'd' },
              onclick: function () { send('make:save'); },
              title: 'download your moose to your computer',
              type: 'button'
            }, shortcut('point_down', 'download')())),
          h('.column.is-4.control',
              h('button.button.is-fullwidth.is-success', {
                attrs: { accesskey: 'u' },
                disabled: (sending ? 'disabled' : null),
                onclick: upload,
                title: 'upload this moose for the world to see!',
                type: 'button'
              }, shortcut((sending ? 'watch' : 'point_up_2'), 'upload' +
                          (sending ? '...' : '!'))))),
          h('p.has-text-centered',
            h('small',
              h('em',
                emoji.copyright, ' ',
                'by uploading, you agree to share your creation under the ',
                h('a', {
                  attrs: { 'data-no-routing': true },
                  href: url + '/CC-BY-SA-4.0.txt',
                  title: 'Creative Commons Attribution-ShareAlike 4.0'
                }, 'cc-by-sa 4.0 license'), '.')))))
  );
};
