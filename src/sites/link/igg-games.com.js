$.register({
  rule: {
    host: /^igg-games\.com?$/,
    path: /\/urls\/([^\/]*)$/,
  },
  start: function (m) {
    'use strict';
    
    var url = atob(m.query[1]);
    url = 'http' + decodeURIComponent(url.substr(url.lastIndexOf('xurl=') + 5));
    $.openLink(url);	
  },
});
