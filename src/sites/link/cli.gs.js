$.register({
  rule: {
    host: /^(www\.)?cli\.gs$/,
  },
  ready: function () {
    'use strict';

    var a = $('a.RedirectLink');
    $.openLink(a.href);
  },
});
