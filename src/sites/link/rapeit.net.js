$.register({
  rule: {
    host: /^(shorturl|sv2|sv3)\.rapeit\.net$/,
    path: /^\/(go|prepair|request|collect|analyze|transfer)\/[\d\w]+/,
  },
  ready: function () {
    'use strict';

    var a = $('#download_link');
    $.openLink(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
