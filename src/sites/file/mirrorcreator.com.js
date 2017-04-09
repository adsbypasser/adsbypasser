$.register({
  rule: {
    host: /^(www\.)?mirrorcreator\.com$/,
    path: /^\/showurl\.php$/,
  },
  ready: function () {
    'use strict';

    var a = $.$('#redirectlink a');
    if (a) {
      $.openLink(a.href);
      return;
    }

    a = $('#redirectlink > div.redirecturl');
    a = a.innerHTML;
    if (!a.match(/^http/)) {
      throw new _.AdsBypasserError('not a valid URL');
    }
    $.openLink(a);
  },
});
