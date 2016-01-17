$.register({
  rule: {
    host: /^ah\.pe$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var url = $.window.url;
    $.get(url).then(function (url) {
      $.openLink(url);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
