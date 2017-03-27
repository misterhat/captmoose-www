var h = require('hyperscript'),

    def = require('../../moose.json'),

    shortcut = require('./shortcut');

module.exports = function (state, prev, send) {
  var background = state.make.background,
      grid = state.make.grid,
      redo = state.make.painter.redoHistory.length,
      undo = state.make.painter.undoHistory.length,
      buttons;

  buttons = [
    h('.columns',
      h('span.column.is-half',
        h('button.button.is-fullwidth', {
            attrs: { accesskey: 'b' },
            onclick: function () { send('make:toggleBackground'); },
            title: (background ? 'hide' : 'show') + ' the checkered-pattern ' +
                   'transparency background'
        }, shortcut((background ? 'black' : 'white') + '_square_button',
                    ('bg ' + (background ? 'hide' : 'show'))))),
      h('span.column.is-half',
        h('button.button.is-fullwidth', {
            attrs: { accesskey: 'g' },
            onclick: function () { send('make:toggleGrid'); },
            title: 'grid ' + (grid ? 'hide' : 'show')
        }, shortcut((grid ? 'black' : 'white') + '_square_button',
                    ('grid ' + (grid ? 'hide' : 'show')))))),
    h('button.button.is-fullwidth', {
      attrs: { accesskey: 'i' },
      title: 'import a regular photo and turn it into a moose',
    }, shortcut('incoming_envelope', 'import image')),
    h('button.button.is-fullwidth.is-danger', {
        attrs: { accesskey: 'k' },
        onclick: function () { send('make:clear'); },
        title: 'clear your moose'
    }, shortcut('gun', 'kill your moose')),
    h('.columns',
      h('span.column.is-half',
        h('span.select.is-fullwidth',
          h('select.outline#moose-replace', {
            onchange: function () {
              var replace = document.querySelector('#moose-replace');
              replace = replace.value.trim();
              send('make:setReplace', replace);
            },
            style: {
              'background-color': state.make.replace,
              color: '#fff'
            }
          }, def.palette.map(function (colour) {
            return h('option.outline', {
                     style: {
                       'background-color': colour,
                       color: '#fff'
                     }
                   }, colour);
          })))),
      h('span.column.is-half',
        h('button.button.is-fullwidth.outline', {
          attrs: { accesskey: 'r' },
          onclick: function () { send('make:replace'); },
          style: {
            'background-color': def.palette[state.make.colour],
            color: '#fff'
          },
          title: 'replace ' + state.make.replace + ' with ' +
                 def.palette[state.make.colour]
        }, shortcut('arrows_clockwise', 'replace')))),
    h('.columns',
      h('span.column.is-4',
        h('button.button.is-fullwidth' +
          (state.make.tool === 'erase' ? '.is-info' : ''), {
          attrs: { accesskey: 'e' },
          onclick: function () { send('make:setTool', 'erase'); },
          title: 'erase individual pixels'
          }, shortcut('dagger_knife', 'erase'))),
      h('span.column.is-4',
        h('button.button.is-fullwidth' +
          (state.make.tool === 'bucket' ?  '.is-info' : ''), {
          attrs: { accesskey: 'f' },
          onclick: function () { send('make:setTool', 'bucket'); },
          title: 'fill in like-coloured pixels'
        }, shortcut('oil_drum', 'fill'))),
      h('span.column.is-4',
        h('button.button.is-fullwidth' +
          (state.make.tool === 'pencil' ? '.is-info' : ''), {
          attrs: { accesskey: 'p' },
          onclick: function () { send('make:setTool', 'pencil'); },
          title: 'paint individual pixels'
        }, shortcut('lower_left_paintbrush', 'paint')))),
    h('.columns',
      h('span.column.is-half',
        h('button.button.is-fullwidth', {
          attrs: { accesskey: 'n' },
          disabled: (!redo ? 'disabled' : null),
          onclick: function () { send('make:redo'); },
          title: 'repeat your mistakes'
        }, shortcut('repeat_one', 'nvm' + (redo ? ' (' + redo + ')' : '')))),
      h('span.column.is-half',
        h('button.button.is-fullwidth', {
          attrs: { accesskey: 'o' },
          disabled: (!undo ? 'disabled' : null),
          onclick: function () { send('make:undo'); },
          title: 'undo - we all make mistakes'
        }, shortcut('hankey', 'oops!' + (undo ? ' (' + undo + ')' : '')))))
  ];

  return (
    h('ul.menu-list.button-list',
      buttons.map(function (button) {
          return h('li', button);
      }))
  );
};
