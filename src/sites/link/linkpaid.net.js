$.register({
  rule: {
    host: /^linkpaid\.net$/,
    path: /^\/go\//,
  },
  ready: function () {
    'use strict';

    var f = $('#btn-main');
    f.click();
  },
});
