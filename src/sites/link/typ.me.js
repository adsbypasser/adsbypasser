$.register({
  rule: {
    host: /^(www\.)?typ\.me$/,
  },
  ready: function (m) {
    'use strict';

    var a = $('#skipAdBtn');
    $.openLink(a.href);
  },
});
