$.register({
  rule: {
    host: /^(www\.)?urlv2\.com$/,
  },
  ready: function (m) {
    'use strict';

    if (window.location.pathname.indexOf('locked') >= 0) {
      // NOTE dirty fix
      var path = window.location.pathname.replace('/locked', '');
      $.openLink(path);
      return;
    }

    var m = $.searchScripts(/jeton=([\w]+)/);
    var l = 'http://urlv2.com/algo.php?action=passer&px=0&so=1&jeton=' + m[1];
    
    // Necessary because of server-side checks
    window.setTimeout(function() {$.openLink(l)}, 5000);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
