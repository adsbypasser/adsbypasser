$.register({
  rule: {
    host: /^www\.linkarus\.com$/,
    path: /^\/skip\//,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var m = $.searchScripts(/action="([^"]+)"/);
    m = m[1];

    $.openLink(m);
  },
});

$.register({
  rule: {
    host: /^www\.linkarus\.com$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var m = $.searchScripts(/var counter = (\d+);/);
    m = parseInt(m[1], 10);
    m = m * 1000 + 500;

    _.wait(m).then(function () {
      var a = $('#skip-ad');
      $.openLink(a.href);
    });
  },
});
