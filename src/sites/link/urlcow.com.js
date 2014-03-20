$.register({
  rule: {
    host: /^(www\.)?(urlcow|miniurl)\.com$/,
  },
  ready: function () {
    'use strict';

    var url = $.$$('script').find(function (n) {
      var m = n.innerHTML.match(/window\.location = "([^"]+)"/);
      if (!m) {
        return _.nop;
      }
      return m[1];
    });
    if (!url) {
      _.warn('rule changed');
      return;
    }
    $.openLink(url.payload);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
