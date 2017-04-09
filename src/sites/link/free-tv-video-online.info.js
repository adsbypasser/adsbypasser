$.register({
  rule: {
    host: /^www\.free-tv-video-online\.info$/,
    path: /^\/interstitial2\.html$/,
    query: /lnk=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    var url = decodeURIComponent(m.query[1]);
    $.openLink(url);
  },
});
