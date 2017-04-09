$.register({
  rule: {
    host: /^www\.zintata\.com$/,
    path: /^\/link\/$/,
  },
  ready: function () {
    'use strict';

    var a = $('#one > center:nth-child(3) > a:nth-child(1)');
    $.openLink(a.href);
  },
});
