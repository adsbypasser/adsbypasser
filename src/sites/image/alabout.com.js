$.register({
  rule: {
    host: /(alabout|alafs)\.com$/,
  },
  ready: function () {
    'use strict';

    $.$$('a').each(function (a) {
      if (/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(a.href)) {
        a.href = a.textContent;
      }
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
