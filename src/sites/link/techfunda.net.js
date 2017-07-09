$.register({
  rule: {
    host: /^techfunda\.net$/,
    path: [
        /^\/link\//,
        /^\/safe\//,
    ],
  },
  ready: function () {
    'use strict';

    var a = $('.hide a.btn');
    $.openLink(a.href);
  },
});
