$.register({
  rule: {
    host: /^www\.(2i\.(sk|cz)|2imgs\.com)$/,
  },
  ready: function () {
    'use strict';

    var img = $('#wrap3 img');
    $.openImage(img.src);
  },
});
