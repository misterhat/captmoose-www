// the entry point for browserify compile.

var choo = require('choo'),
    emoji = require('node-emoji').emoji,

    def = require('./moose.json'),
    iframeView = require('./lib/views/iframe'),
    models = require('./lib/models'),
    pkg = require('./package.json'),
    states = require('./lib/states'),
    url = require('./lib/url'),
    validate = require('./lib/validate'),
    views = require('./lib/views');

var app = choo(),
    ircFrame = iframeView(def['irc-frame'], 'irc-frame')(),
    tree;

Object.keys(models).forEach(function (model) {
  app.model(models[model]);
});

app.router(Object.keys(views).map(function (view) {
  var uri = '/' + (view === 'home' ? '' : view);
  return [ uri, views[view] ];
}));

app.use({
  onStateChange: function (state, data, prev) {
    if (state.nav.title !== states.irc.nav.title) {
      ircFrame.style.display = 'none';
    } else {
      ircFrame.style.display = 'block';
      iframeView.supplant(ircFrame, document.getElementById('irc'));
    }
  }
});

tree = app.start();

document.body.innerHTML = '';
document.body.appendChild(ircFrame);
document.body.appendChild(tree);
