$.register({
  rule: {
    host: /^(www\.)?supercheats\.com$/,
    path: /^\/interstitial\.html$/,
    query: /(?:\?|&)oldurl=([^&]+)(?:$|&)/,
  },
  start: function (m) {
    'use strict';

    $.openLink(m.query[1]);
  },
});
