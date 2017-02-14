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

    // Hide countdown
    var envio = $('#envio');
    envio.disabled = false;
    envio.style.visibility = 'hidden';
    envio.style.display = 'none';

    // Display skip button
    var envio2 = $('#envio2');
    envio2.style.visibility = 'visible';
    envio2.style.display = 'block';

    // Force captcha window to be shown
    $.window.$('#myModal').reveal();
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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
