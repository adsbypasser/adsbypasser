$.register({
  rule: {
    host: /^(www\.)?adfe\.es$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var f = $('#frmvideo');

    // Not at the final step?
    if (!f.STEP4) {
      return;
    }

    f.submit();
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
