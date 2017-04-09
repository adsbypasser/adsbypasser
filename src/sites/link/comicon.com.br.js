$.register({
  rule: {
    host: /^www\.comicon\.com\.br$/,
    path: /^\/redir\.php$/,
  },
  ready: function () {
    'use strict';

    var a = $('#link');
    $.openLink(a.href);
  },
});
