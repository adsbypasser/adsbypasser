$.register({
  rule: {
    host: /^img3x\.net$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('form');
    if (f) {
      f.submit();
      return;
    }

    f = $('#show_image');
    $.openImage(f.src);
  },
});
