$.register({
  rule: {
    host: /^sht\.io$/,
    path: /^\/\d+\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.path[1]);
    // the salt is like: XXX{sht-io}url{sht-io}{sht-io}standard
    url = url.match(/\{sht-io\}(.+)\{sht-io\}.*\{sht-io\}/);
    $.openLink(url[1]);
  },
});
