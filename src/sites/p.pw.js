$.register({
  rule: {
    host: /^p\.pw$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var url = null;
    $.$$('script').find(function (script) {
      var m = script.innerHTML.match(/window\.location = "(.*)";/);
      if (m) {
        url = m[1];
        return true;
      }
    });

    $.openLink(url);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
