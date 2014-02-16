$.register({
  rule: {
    host: /^ity\.im$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('#main');
    if (f) {
      $.openLink(f.src);
    }
    f = $.$$('frame').find(function (frame) {
      if (frame.src.indexOf('interheader.php') < 0) {
        return _.nop;
      }
      return frame.src;
    });
    if (f) {
      $.openLink(f.payload);
      return;
    }

    f = $.$$('script').find(function (script) {
      var m = script.innerHTML.match(/krypted=([^&]+)/);
      if (!m) {
        return _.nop;
      }
      return m[1];
    });
    if (!f) {
      return;
    }
    f = f.payload;
    var data = unsafeWindow.des('ksnslmtmk0v4Pdviusajqu', unsafeWindow.hexToString(f), 0, 0);
    if (data) {
      $.openLink('http://ity.im/1104_21_50846_' + data);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
