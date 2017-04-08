$.register({
  rule: {
    host: /^imgvault\.pw$/,
    path: /^\/view-image\//,
  },
  ready: function () {
    'use strict';

    var a = $('article div.span7 a[target="_blank"]');
    $.openImage(a.href);
  },
});
