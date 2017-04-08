// Binbox links
$.register({
  rule: {
    host: /^(www\.)?([a-zA-Z0-9]+\.)?binbox\.io$/,
    path: /\/o\/([a-zA-Z0-9]+)/,
  },
  start: function (m) {
    'use strict';
    var direct_link = window.atob(m.path[1]);
    $.openLink(direct_link);
  },
});
