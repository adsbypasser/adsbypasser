$.register({
  rule: {
    host: /^2ty\.cc$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var a = $('#close');
    $.openLink(a.href);
  },
});
