$.register({
  rule: function (uri_1, uri_3, uri_6) {
    if (!/^madlink\.sk$/.test(uri_6.host) || /\.html$/.test(uri_6.path)) {
      return null;
    }
    return uri_6.path.match(/^\/(.+)/);
  },
  start: function (m) {
    'use strict';

    $.removeNodes('iframe');
    $.post('/ajax/check_redirect.php', {
      link: m[1],
    }, function (text) {
      $.openLink(text);
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
