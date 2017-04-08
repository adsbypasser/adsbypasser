$.register({
  rule: {
    host: /^coinlink\.co$/,
    path: /^\/i\//,
  },
  ready: function (m) {
    'use strict';

    // this site frequently changes its style, just keep all pattern here
    var a = $('a#btn-main, a.btn.btn-block.btn-warning, a.btn.btn-block.btn-success');
    $.openLink(a.href);
  },
});
