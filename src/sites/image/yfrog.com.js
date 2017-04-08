$.register({
  rule: {
    host: /\.yfrog\.com$/,
  },
  ready: function () {
    'use strict';

    if (/^\/z/.test(window.location.pathname)) {
      var i = $('#the-image img');
      $.openImage(i.src);
      return;
    }
    var a = $.$('#continue-link a, #main_image');
    if (a) {
      $.openLink('/z' + window.location.pathname);
      return;
    }
  },
});
