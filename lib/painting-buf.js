var GridPaint = require('gridpaint'),

    def = require('../moose.json');

module.exports = function (painting) {
  var painter = new GridPaint({
    cellHeight: 5,
    cellWidth: 4,
    height: def.height,
    palette: def.palette,
    width: def.width
  });

  painter.background = false;
  painter.painting = painting;
  painter.draw();

  return painter.canvas.toBuffer();
};
