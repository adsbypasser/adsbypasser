$.register({
  rule: {
    host: /^coinlink\.co$/,
    path: /^\/i\//,
  },
  ready: function (m) {
    'use strict';

    // this site frequently changes its style, just keep all pattern here
    var a = $('a#btn-main, a.btn.btn-block.btn-warning, a.btn.btn-block.btn-success');
    $.openLink(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
