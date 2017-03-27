// create a hidden iframe to maintain state between view changes

module.exports = function (src, id) {
  return function () {
    var iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.src = src;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.style.zIndex = 100;
    return iframe;
  };
};

module.exports.supplant = function (iframe, placeholder) {
  var rect;

  if (!iframe || iframe.style.display === 'none') {
    return;
  }

  rect = placeholder.getBoundingClientRect();

  iframe.style.top = (rect.top + window.scrollY) + 'px';
  iframe.style.left = (rect.left + window.scrollX) + 'px';
  iframe.style.width = rect.width + 'px';
  iframe.style.height = rect.height + 'px';
};
