var emoji = require('node-emoji').emoji,
    h = require('hyperscript');

// used to indicate a keyboard shortcut
module.exports = function (e, text) {
    return function () {
        return h('span', emoji[e] + ' ', h('strong', text.slice(0, 1)),
                 text.slice(1));
    };
};
