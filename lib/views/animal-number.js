var commaNumber = require('comma-number'),
    h = require('hyperscript'),

    url = require('../url');

module.exports = function (number) {
  number = commaNumber(number);

  return (
    h('strong', {
      title: number
    },
      number.split('').map(function (digit) {
        if (!/^[0-9]$/.test(digit)) {
          return h('span', digit);
        }

        return h('img', {
          alt: digit,
          attrs: { draggable: 'false' },
          height: 48,
          src: url + '/animal-numbers/' + digit + '.svg',
          style: { cursor: 'text' },
          width: 48
        });
      }))
  );
};
