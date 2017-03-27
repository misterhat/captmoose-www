var fs = require('fs'),

    h = require('hyperscript'),
    marked = require('marked');

var README = fs.readFileSync(__dirname + '/../../README.md', 'utf8');
README = marked(README);

var parseHtml;

if (process.browser) {
  parseHtml = function (html) {
    return new DOMParser().parseFromString(html, 'text/html');
  };
} else {
  parseHtml = require('jsdom').jsdom;
}

function getReadmeDom() {
  var readme = parseHtml(README).body,
      children = Array.prototype.slice.call(readme.childNodes),
      intro = children.indexOf(readme.querySelector('h2')),
      license = children.indexOf(readme.querySelector('h2#license')),
      content = children.slice(intro, license);

  return content;
}

module.exports = function () {
  var dom = getReadmeDom();

  return function (state, prev, send) {
    return dom;
  };
};
