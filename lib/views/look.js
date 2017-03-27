var countries = require('country-list')(),
    cq = require('country-query'),
    emoji = require('node-emoji').emoji,
    h = require('hyperscript'),

    lookNav = require('../navigation')[2],
    lookState = require('../states').look,
    url = require('../url'),
    validate = require('../validate'),

    footer = require('./footer'),
    header = require('./header'),
    mooseCard = require('./moose-card'),
    search = require('./search');

module.exports = function (state, prev, send) {
  if (send && state.nav.title !== lookState.nav.title) {
    send('nav:update', lookState.nav);
  }

  return (
    h('main',
      header(state, prev, send),
      h('section.section',
        h('.container',
          h('.columns',
            h('header.heading.column',
              h('h1.title', 'look @ meese'),
              h('h2.subtitle', emoji[lookNav.emoji], ' ', lookNav.attr.title)),
            h('aside.column.is-2',
              h('img', {
                alt: 'image of Artemis',
                src: url + '/artemis.svg',
                style: {
                  'max-height': '150px',
                  height: '100%',
                  width: '100%',
                }
              }))),
          h('hr'),
          h('form.columns', {
            action: url + '/look',
            method: 'get'
          },
            h('p.control.column',
              h('label.label',
                emoji['speaking_head_in_silhouette'], ' words'),
              search(state, prev, send)),
            h('p.control.column.is-2',
              h('label.label', {
                attrs: { 'for': 'moose-country' }
              }, emoji.flags, ' nationality'),
              h('span.select.is-fullwidth',
                h('select#moose-country', { name: 'country' },
                  h('option', {
                    value: 'all'
                  }, emoji['earth_americas'], ' globalist'),
                  h('option', {
                    value: 'alien'
                  }, emoji.alien, ' alien'),
                  countries.getNames().map(function (c) {
                    var code = countries.getCode(c),
                        demonym;

                    try {
                      demonym = cq.find('cca2', code).demonym;
                    } catch (e) {
                    }

                    if (demonym) {
                      demonym = demonym.toLowerCase();
                    } else {
                      demonym = c.toLowerCase() + ' resident';
                    }

                    return h('option', {
                      value: code.toLowerCase()
                    }, emoji['flag-' + code.toLowerCase()], ' ', demonym);
                  })))),
            h('p.control.column.is-2',
              h('input.button.is-fullwidth.is-primary', {
                style: { height: '100%' },
                type: 'submit',
                value: 'search',
              }))),
          h('hr'),
          /*h('p.has-text-centered',
            h('button.button.is-info.is-large',
              emoji['older_man'], ' load previous meese... ',
              emoji['older_woman'])),
          h('br'),*/
          h('.columns',
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' }))),
          h('.columns',
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' }))),
          h('.columns',
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' }))),
          h('.columns',
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' })),
            h('.column.is-4', mooseCard({ name: 'test' }))),
          h('br'),
          h('p.has-text-centered',
            h('button.button.is-primary.is-large',
              emoji.girl, ' load more meese (page 9)... ', emoji.boy)))),
      footer(state, prev, send))
  );
};
