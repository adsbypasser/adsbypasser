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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
