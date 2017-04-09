$.register({
  rule: {
    host: [
      /^(www\.)?shortenurl\.tk$/,
      /^(www\.)?pengaman\.link$/,
      /^urlgo\.gs$/,
      /^gunting\.web\.id$/,
    ],
    path: /^\/\w+$/,
  },
  ready: function (m) {
    'use strict';

    var l = $('a.btn-block.redirect');

    $.openLink(l.href);
  },
});
