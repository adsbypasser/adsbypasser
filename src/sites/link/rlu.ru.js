$.register({
  rule: {
    host: /^preview\.rlu\.ru$/,
  },
  ready: function () {
    'use strict';

    var a = $('#content > .long_url > a');
    $.openLink(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;