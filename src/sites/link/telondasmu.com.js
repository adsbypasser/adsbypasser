$.register({
  rule: {
    host: /^www\.telondasmu\.com$/,
  },
  ready: function () {
    'use strict';
    var a = $('.download-link a');
    $.openLink(a.href);
  },
});
