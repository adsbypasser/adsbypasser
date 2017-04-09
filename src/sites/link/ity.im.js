$.register({
  rule: {
    host: /^ity\.im$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('#main');
    if (f) {
      $.openLink(f.src);
      return;
    }

    f = $.$$('frame').find(function (frame) {
      if (frame.src.indexOf('interheader.php') < 0) {
        return _.none;
      }
      return frame.src;
    });
    if (f) {
      $.openLink(f.payload);
      return;
    }

    f = $.searchScripts(/krypted=([^&]+)/);
    if (!f) {
      throw new _.AdsBypasserError('site changed');
    }
    f = f[1];
    var data = $.window.des('ksnslmtmk0v4Pdviusajqu', $.window.hexToString(f), 0, 0);
    if (data) {
      $.openLink('http://ity.im/1104_21_50846_' + data);
    }
  },
});
