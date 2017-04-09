$.register({
  rule: {
    host: /^(www\.)?ah-informatique\.com$/,
    path: /^\/ZipUrl/,
  },
  ready: function () {
    'use strict';

    var a = $('#zip3 a');
    $.openLink(a.href);
  },
});
