// Note: Captcha is verified client-side
$.register({
  rule: {
    host: /^(www\.)?boxcash\.net$/,
    path: /^\/[\w~]+$/,
  },
  ready: function () {
    'use strict';

    // JSON.parse() is not used because their JSON is malformed
    var m = $.searchScripts(/\'\/ajax_link\.php\',\s*\{key:\s*'(\w+)',\s*url:\s*'(\d+)',\s*t:\s*'(\d+)',\s*r:\s*'(\w*)'\}/);
    if (!m) {
      return;
    }

    $.post('/ajax_link.php', {
      key: m[1],
      url: m[2],
      t: m[3],
      r: m[4],
    }).then(function (response) {
      var l = response.match(/window(?:.top.window)\.location="([^"]+)"/);
      $.openLink(l[1]);
    });
  },
});

$.register({
  rule: {
    host: /^(www\.)?boxcash\.net$/,
    path: /^\/redirect\.html$/,
    query: /url=(.+)$/,
  },
  start: function (m) {
    'use strict';

    var l = decodeURIComponent(m.query[1]);
    $.openLink(l);
  },
});
