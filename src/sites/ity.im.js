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
      return frame.src.indexOf('interheader.php') >= 0;
    });
    if (f) {
      $.openLink(f.src);
    }

    var data = null;
    $.$$('script').find(function (script) {
      data = script.innerHTML.match(/krypted=([^&]+)/);
      return !!data;
    });
    if (!data) {
      return;
    }
    data = data[1];
    f = unsafeWindow.des('ksnslmtmk0v4Pdviusajqu', unsafeWindow.hexToString(data), 0, 0);
    if (f) {
      $.openLink('http://ity.im/1104_21_50846_' + f);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
