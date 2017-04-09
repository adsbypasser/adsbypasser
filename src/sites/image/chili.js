$.register({
  rule: {
    host: [
      /^imgchili\.(com|net)$/,
      /^(www\.)?pixhost\.org$/,
    ],
    path: /^\/show\//,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe, #ad');

    try {
      $('#all').style.display = '';
    } catch (e) {
      // do nothing
    }

    var o = $('#show_image, #image');
    $.openImage(o.src);
  },
});
