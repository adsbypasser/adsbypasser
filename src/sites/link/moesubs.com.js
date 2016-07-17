$.register({
  rule: {
    host: /^moesubs\.com$/,
    path: /^\/url\//,
  },
  ready: function () {
    'use strict';

    var a = $('body > div:nth-child(4) > i:nth-child(1)');
    a = a.textContent;
    var i = a.lastIndexOf('http');
    a = a.substr(i);
    $.openLink(a);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
