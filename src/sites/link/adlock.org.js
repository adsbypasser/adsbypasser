$.register({
  rule: {
    host: /^adlock\.org$/,
  },
  ready: function () {
    'use strict';

    var a = $.$('#xre a.xxr, #downloadButton1');
    if (a) {
      $.openLink(a.href);
      return;
    }

    a = $.window.fileLocation;
    if (a) {
      $.openLink(a);
    }
  },
});
