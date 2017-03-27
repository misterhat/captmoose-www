// https://www.npmjs.com/package/client-sessions#cryptography
// generate and cache a secret. this prevents invalidated sessions on server
// restart.

var crypto = require('crypto'),
    fs = require('fs');

var file, secret;

if (!process.browser) {
  file = __dirname + '/../secret';

  try {
    secret = fs.readFileSync(file, 'utf8');
  } catch (e) {
    secret = crypto.randomBytes(128).toString();
    fs.writeFileSync(file, secret);
  }
}

module.exports = secret;
