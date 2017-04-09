$.register({
  rule: {
    host: /^vavi\.co$/,
  },
  ready: function () {
    'use strict';

    var l = $('#goLink');
    $.openLink(l.href);
  },
});
