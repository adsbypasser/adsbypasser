$.register({
  rule: {
    host: /^adjet\.biz$/,
  },
  ready: function () {
    'use strict';

    var script = $.$$('script').find(function (v) {
      var m = v.innerHTML.match(/href=(\S+)/);
      if (!m) {
        return _.nop;
      }
      return m;
    });
    script = script.payload[1];
    $.openLink(script);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
