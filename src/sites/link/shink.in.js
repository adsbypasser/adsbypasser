$.register({
  rule: {
    host: [
      /^(www\.)?shink\.in$/,
      /^fas\.li$/,
      /^(www\.)?croco\.(me|site)$/,
    ],
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var f = $('#skip');

    if (!$.$('#captcha')) {
      // No captcha, we can redirect straight away
      f.submit();
      return;
    }
  },
});

$.register({
  rule: [
    {
      host: [
        /^(www\.)?shink\.in$/,
        /^fas\.li$/,
      ],
      path: /^\/go\/\w+$/,
    },
    {
      host: /^(www\.)?croco\.(me|site)$/,
      path: /^\/ok\/\w+$/,
    },
  ],
  ready: function () {
    'use strict';

    var a = $('#btn-main');
    var i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    $.openLink(a);
  },
});
