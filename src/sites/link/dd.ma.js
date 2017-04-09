$.register({
  rule: {
    host: /^(www\.)?dd\.ma$/,
  },
  ready: function (m) {
    'use strict';

    var i = $.$('#mainframe');
    if (i) {
      $.openLink(i.src);
      return;
    }

    var a = $('#btn_open a');
    $.openLink(a.href);
  },
});
