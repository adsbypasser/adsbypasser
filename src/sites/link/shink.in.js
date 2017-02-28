$.register({
  rule: {
    host: [
      /^(www\.)?shink\.in$/,
      /^fas\.li$/,
      /^croco\.me$/,
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
      host: /^croco\.me$/,
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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
