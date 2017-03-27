// provide the correct filename for server inclusion of bundles

var IS_DEV = process.env.NODE_ENV !== 'production';

var hashes;

if (process.browser) {
  hashes = {
    'build/bundle.min.css': 'build/bundle.min.css',
    'build/bundle.min.js': 'build/bundle.min.js'
  };
} else if (!IS_DEV) {
  hashes = require('../assets/hashes.json');
} else {
  hashes = {
    'build/bundle.min.css': 'build/bundle.css',
    'build/bundle.min.js': 'build/bundle.js'
  };
}

module.exports = hashes;
