$.register({
  rule: {
    host: /^(www\.)?uskip\.me$/,
    path: /^\/go\/\w+$/,
  },
  ready: function (m) {
    'use strict';

    var a = $('#btn-main');
    $.openLink(a.href);
  },
});
