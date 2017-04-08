$.register({
  rule: {
    host: /^catcut\.net$/,
  },
  ready: function () {
    'use strict';

    var a = $('#rbs');
    $.openLink(a.href);
  },
});
