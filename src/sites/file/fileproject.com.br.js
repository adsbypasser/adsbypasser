$.register({
  rule: {
    host: /^www\.fileproject\.com\.br$/,
    path: /^\/files\/+/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/<a id="down" href="([^"]+)">/);

    $.openLink(m[1]);
  },
});
