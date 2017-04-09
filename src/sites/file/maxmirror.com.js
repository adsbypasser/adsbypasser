$.register({
  rule: {
    host: /^(www\.)?maxmirror\.com$/,
    path: /^\/redirect\//,
  },
  ready: function () {
    'use strict';

    var l = $('#download_url > a');
    $.openLink(l.href);
  },
});
