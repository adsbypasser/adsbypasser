$.register({
  rule: {
    host: /^(www\.)?clictune\.com$/,
    path: /^\/id=\d+/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var matches = $.searchScripts(/<a href="http:\/\/(?:www.)?clictune\.com\/redirect\.php\?url=([^&]+)&/);
    var url = decodeURIComponent(matches[1]);

    $.openLink(url);
  },
});
