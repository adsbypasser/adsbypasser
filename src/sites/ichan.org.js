// image
$.register({
  rule: {
    host: /^ichan\.org$/,
    path: /^\/image\.php$/,
    query: /path=(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/' + m.query[1]);
  },
});

// board
$.register({
  rule: {
    host: /ichan\.org$/,
  },
  ready: function () {
    'use strict';

    $.$$('a').each(function (a) {
      if (a.href.indexOf('/url/http://') > -1) {
        a.href = a.href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/, '');
      }
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
