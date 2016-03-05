$.register({
  rule: {
    host: /^(www\.)?pixroute\.com$/
  },
  ready: function () {
    'use strict';

    // the img ID is a random string
    var o = $('.fr4me > div:nth-child(20) > a:nth-child(1) > img:nth-child(1)');
    $.openImage(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
