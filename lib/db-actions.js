// various interactions with a knex database instance
var commonWords = require('common-words'),

    paintingBuf = require('./painting-buf');

commonWords = commonWords.map(function (entry) {
  return entry.word.toLowerCase();
}).slice(0, 50);

function grabMooseAttr(db, name, attr, done) {
  var attrQuery = db('moose').select(attr).where('name', name);

  attrQuery.asCallback(function (err, row) {
    if (err) {
      return done(err);
    }

    if (row && row.length) {
      row = row[0][attr];
    } else {
      row = null;
    }

    done(null, row);
  });
}

function grabPainting(db, name, done) {
  grabMooseAttr(db, name, 'painting', function (err, painting) {
    if (err) {
      return done(err);
    }

    try {
      painting = JSON.parse(painting);
    } catch (e) {
      return done(e);
    }

    done(null, painting);
  });
}

function grabPng(db, name, done) {
  grabMooseAttr(db, name, 'painting_png', done);
}

// grab recent moose. by default grabs the 10 latest, but optionally accepts
// skip and limit arguments
function grabRecentMoose() {
  var args = Array.prototype.slice.call(arguments),
      db = args[0],
      skip = 0,
      limit = 10,
      done;

  if (args.length === 4) {
    skip = args[1];
    limit = args[2]
    done = args[3];
  } else if (args.length === 3) {
    skip = args[1];
    done = args[2];
  } else {
    done = args[2];
  }

  db('moose').select('born', 'name', 'painting')
             .orderBy('born', 'desc')
             .offset(skip)
             .limit(limit)
             .asCallback(done);
}

// check if a moose name is taken
function isMooseFree(db, name, done) {
  var existsQuery = db('moose').count('id as tid').where('name', name);

  existsQuery.asCallback(function (err, count) {
    if (err) {
        return done(err);
    }

    done(null, !count[0].tid);
  });
}

// commit a moose to the database
function saveMoose(db, fields, done) {
  var paintingStr, nameWords;

  try {
    paintingStr = JSON.stringify(fields.painting);
  } catch (e) {
    return done(e);
  }

  nameWords = fields.name.split('-');
  nameWords = nameWords.filter(function (word) {
    return commonWords.indexOf(word) === -1;
  });

  db('moose').insert({
    'painting_png': paintingBuf(fields.painting),
    'user_agent': fields['user_agent'],
    born: Date.now(),
    ip: fields.ip,
    name: fields.name,
    painting: paintingStr
  }).asCallback(function (err, row) {
    var wordQuery;

    if (err) {
      return done(err);
    }

    wordQuery = db('moose_words').insert(nameWords.map(function (word) {
      return {
        'moose_id': row[0],
        word: word
      };
    }));

    wordQuery.asCallback(done);
  });
}

// determine whether an IP address has posted too recently or not
function shouldThrottleMake(db, ip, done) {
  var latestQuery = db('moose').select('born')
                               .where('ip', ip)
                               .orderBy('born', 'desc')
                               .limit(1);

  latestQuery.asCallback(function (err, latest) {
    if (err) {
      return done(err);
    }

    latest = latest.length ? latest[0].born : 0;
    latest = Math.round((Date.now() - latest) / 1000);

    done(null, latest);
  });
}

module.exports = {
  grabPainting: grabPainting,
  grabPng: grabPng,
  grabRecentMoose: grabRecentMoose,
  isMooseFree: isMooseFree,
  saveMoose: saveMoose,
  shouldThrottleMake: shouldThrottleMake
};
