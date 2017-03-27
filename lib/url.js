// format the website's url for inclusion in href attributes

var format = require('url').format;

var def = require('../moose.json');

module.exports = format({
  protocol: '',
  hostname: def.hostname,
  port: !/^80|443$/.test(def.port) ? def.port : ''
});
