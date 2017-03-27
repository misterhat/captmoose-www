// used on the moose painter

var GridPaint = require('gridpaint'),
    emojify = require('node-emoji').emojify,
    generateName = require('sillyname'),
    leetspeak = require('l33tsp34k'),
    rngEmoji = require('node-emoji').random,

    def = require('../../moose.json'),
    formatName = require('../format-name'),
    states = require('../states'),
    upload = require('../upload'),
    validate = require('../validate');

var painter = new GridPaint({
      cellHeight: 20,
      cellWidth: 16,
      height: def.height,
      palette: def.palette,
      width: def.width
    }),
    state = states.make.make;

painter.colour = state.colour;
painter.init();

state.painter = painter;

module.exports = {
  namespace: 'make',
  state: state,
  reducers: {
    clear: function (state) {
      painter.clear();
    },
    randomName: function (state) {
      var name;

      name = rngEmoji().emoji + ' ' + generateName().toLowerCase() + ' ' +
             rngEmoji().emoji;

      if (Math.floor(Math.random() * 10) === 5) {
        state.name = formatName(leetspeak(name));
      } else {
        state.name = name;
      }

      return state;
    },
    redo: function (state) {
      painter.redo();
    },
    replace: function (state) {
      painter.replace(state.replace, state.colour);
    },
    save: function (state) {
      var name = state.name.length ? state.name : 'anonymoose';
      painter.saveAs(name + '.png');
    },
    setColour: function (state, colour) {
      if (state.tool === 'erase') {
        state.tool = 'pencil';
        painter.tool = state.tool;
      }

      state.colour = colour;
      painter.colour = state.colour;
      return state;
    },
    setName: function (state, name) {
      state.name = name;
      return state;
    },
    setPainting: function (state, painting) {
      try {
        state.painting = JSON.stringify(painting);
        window.localStorage.setItem('draft', state.painting);
      } catch (e) {
      }

      return state;
    },
    setReplace: function (state, colour) {
      state.replace = colour;
      return state;
    },
    setSending: function (state, sending) {
      state.sending = sending;
      return state;
    },
    setTool: function (state, tool) {
      if (painter.colour === 0) {
        painter.colour = state.colour;
      }

      state.tool = tool;

      if (tool === 'erase') {
        painter.tool = 'pencil';
        painter.colour = 0;
      } else {
        painter.tool = state.tool;
      }

      return state;
    },
    toggleBackground: function (state) {
      state.background = !state.background;
      painter.background = state.background;
      return state;
    },
    toggleGrid: function (state) {
      state.grid = !state.grid;
      painter.grid = state.grid;
      return state;
    },
    undo: function (state) {
      painter.undo();
    }
  },
  effects: {
    upload: upload
  },
  subscriptions: {
    updatePainting: function (send, done) {
      var draft;

      function update() {
        if (!painter.isApplied) {
          send('make:setPainting', painter.painting, done);
        }
      }

      try {
        draft = JSON.parse(window.localStorage.getItem('draft'));
      } catch (e) {
        draft = null;
      }

      if (draft) {
        painter.painting = draft;
        send('make:setPainting', painter.painting, done);
      }

      painter.on('applyTool', update);
      painter.on('clear', update);
      painter.on('redo', update);
      painter.on('replace', update);
      painter.on('undo', update);
    }
  }
}
