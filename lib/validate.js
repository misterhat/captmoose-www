// validate user input on the browser and server.

var spliddit = require('spliddit'),
    emoji = require('node-emoji'),

    badNameView = require('./views/bad-name'),
    badPaintingView = require('./views/bad-painting'),
    def = require('../moose.json');

var MAX_LENGTH = 50,
    TOTAL_SQUARES = def.width * def.height;

function isVariation(c) {
  c = c.charCodeAt(0);
  return c >= 65024 && c <= 65039;
}

function isValidChar(c) {
  return /[a-z0-9\-\,]/i.test(c) || isVariation(c);
}

// ensure name only contains alphanumeric characters, dashes, numbers & emoji.
function isValidName(name) {
  var i, c;

  if (typeof name !== 'string') {
    return false;
  }

  name = spliddit(name.trim());

  if (name.length < 3 || name.length > MAX_LENGTH) {
    return false;
  }

  for (i = 0; i < name.length; i += 1) {
    c = name[i];

    if (!emoji.which(c) && !isValidChar(c)) {
      return false;
    }
  }

  return true;
}

// ensure the painting is the correct size, only contains integers within the
// palette, and is not 100% empty
function isValidPainting(painting) {
  var empties = 0,
      i, j, c;

  if (painting.length !== def.height || painting[0].length !== def.width) {
    return false;
  }

  for (i = 0; i < painting.length; i += 1) {
    for (j = 0; j < painting[i].length; j += 1) {
      c = parseInt(painting[i][j], 10);

      if (isNaN(c) || c < 0 || c > def.palette.length) {
        return false;
      }


      empties += (c === 0 ? 1 : 0);
    }
  }

  return empties < TOTAL_SQUARES;
}

function isValidForm(fields) {
  if (!isValidName(fields.name)) {
    return badNameView;
  } else if (!isValidPainting(fields.painting)) {
    return badPaintingView;
  }
}

module.exports = {
  form: isValidForm,
  maxlength: MAX_LENGTH,
  name: isValidName,
  painting: isValidPainting
};
