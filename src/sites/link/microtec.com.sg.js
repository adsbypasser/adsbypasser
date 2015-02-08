$.register({
  rule: {
    host: /^(www\.)?microtec\.com\.sg$/,
    path: /^\/short\/\w+$/,
  },
  ready: function (m) {
    'use strict';

    var l = $('a.btn-block.redirect').href;
    var b64 = l.match(/\?r=(\w+={0,2}?)/); 

    $.openLink(atob(b64[1]));
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
