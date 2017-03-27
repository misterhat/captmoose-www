// apply emoify transformations to a name string

var emoji = require('node-emoji').emoji,
    emojify = require('node-emoji').emojify,
    escapeRegexp = require('escape-string-regexp'),

    smiles = require('./smiles');

module.exports = function (name) {
  name = emojify(name);

  Object.keys(smiles).forEach(function (smile) {
    name = name.replace(new RegExp(escapeRegexp(smile), 'g'),
                        emoji[smiles[smile]]);
  });

  return name;
};
