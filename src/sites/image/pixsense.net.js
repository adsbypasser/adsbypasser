$.register({
  rule: {
    host: /^www\.pixsense\.net$/,
    path: /^\/site\/v\/\d+$/,
  },
  ready: function () {
    'use strict';

    var a = $('#myUniqueImg').parentNode;
    $.openLink(a.href);
  },
});
