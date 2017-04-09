$.register({
  rule: {
    host: [
      /^moe\.god\.jp$/,
      /^moesubs\.akurapopo\.pro$/,
      /^dl\.nsfk\.in$/,
    ]
  },
  ready: function () {
    'use strict';

    var a = $('div div center a');
    $.openLink(a.href);
  },
});
