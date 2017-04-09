$.register({
  rule: {
    host: /^durl\.me$/,
  },
  ready: function () {
    'use strict';

    var a = $('a[class="proceedBtn"]');
    $.openLink(a.href);
  },
});
