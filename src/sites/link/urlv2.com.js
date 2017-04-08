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
