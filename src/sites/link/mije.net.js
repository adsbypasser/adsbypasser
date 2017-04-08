$.register({
  rule: {
    host: /^www\.mije\.net$/,
    path: /^\/\w+\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.path[1]);
    // assuming all url is valid
    $.openLink(url);
  },
});
