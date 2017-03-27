// http://knexjs.org/#Migrations-API

var def = require('../moose.json'),
    frames = require('../lib/frames'),
    reactions = require('../lib/reactions'),
    validate = require('../lib/validate');

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cache', function (table) {
      table.boolean('in_progress').defaultTo(false);
      table.increments('id').unsigned().primary();
      table.json('value').notNull();
      table.string('key').unique().notNull();
      table.timestamp('last_updated').notNull().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('moose', function (table) {
      table.binary('painting_png').notNull();
      table.increments('id').unsigned().primary();
      table.json('painting').notNull();
      table.string('country', 2).index();
      table.string('frame', frames).index();
      table.string('ip').notNull();
      table.string('name', validate.maxlength).unique().notNull();
      table.string('user_agent');
      table.timestamp('born').notNull().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('moose_reactions', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('moose_id').unsigned().references('id').inTable('moose')
           .index();
      table.string('ip').notNull();
      table.string('reaction');
      table.timestamp('when').notNull().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('moose_words', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('moose_id').unsigned().references('id').inTable('moose')
           .index();
      table.string('word', validate.maxlength).notNull();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('cache'),
    knex.schema.dropTableIfExists('moose'),
    knex.schema.dropTableIfExists('moose_reactions')
  ]);
};
