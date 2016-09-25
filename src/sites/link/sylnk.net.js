// all blog type belong here?

$.register({
  rule: [
    {
      host: [
        /^(www\.)?sylnk\.net$/,
        /^dlneko\.(com|net|org)$/,
        /^rumahsimpel\.com$/,
      ],
      query: /link=([^&]+)/,
    },
    {
      host: /^(www\.)?compul\.in$/,
      path: /^\/n\.php$/,
      query: /v=([^&]+)/,
    },
    {
      host: /^(www\.)?safelinkair\.com$/,
      path: /^\/code$/,
      query: /(?:\?|&)link=([a-zA-Z0-9\/=]+)(?:$|&)/,
    },
    {
      host: [
        /^link\.filmku\.net$/,
        /^www\.healthygress24\.ga$/,
        /^kombatch\.amankan\.link$/,
      ],
      path: /^\/p\/(go|healty-lie)\.html$/,
      query: /^\?url=([a-zA-Z0-9\/=]+)$/,
    },
    {
      host: [
        /^(gadget|auto|sports)14\.pw$/,
        /^motosport\.pw$/,
        /^nar-04\.tk$/,
        /^lindung\.in$/,
        /^motonews\.club$/,
      ],
      query: /^\?d=([a-zA-Z0-9\/=]+)$/,
    },
    {
      host: /^www\.anisubsia\.tk$/,
      path: /^\/p\/link\.html$/,
      query: /^\?url=([a-zA-Z0-9\/=]+)$/,
    },
    {
      host: [
        /^www\.insurance1\.tech$/,
        /^www\.freeanimeonline\.xyz$/,
      ],
      query: /^\?site=([a-zA-Z0-9\/=]+)/,
    },
    {
      host: /^i\.gtaind\.com$/,
      query: /^\?([a-zA-Z0-9\/=]+)$/,
    },
  ],
  start: function (m) {
    'use strict';
    var rawLink = atob(m.query[1]);

    $.openLink(rawLink);
  },
});

$.register({
  rule: [
    {
      host: [
        /^(www\.)?(link\.)?safelink(converter2?|s?review(er?))\.com$/,
        /^susutin\.com$/,
        /^getcomics\.gq$/,
      ],
      query: /id=(\w+=*)/,
    },
    {
      host: [
        /^(www\.)?dlneko\.com$/,
        /^(satuasia|tawaku)\.com$/,
        /^ww3\.manteb\.in$/,
        /^link\.filmku\.net$/,
        /^www\.muucih\.com$/,
        /^(naisho|filmku)\.lompat\.in$/,
        /^edogawa\.lon\.pw$/,
      ],
      query: /go=(\w+=*)/,
    },
  ],
  start: function (m) {
    'use strict';

    var l = atob(m.query[1]);
    var table = {
      '!': 'a',
      ')': 'e',
      '_': 'i',
      '(': 'o',
      '*': 'u',
    };
    l = l.replace(/[!)_(*]/g, function (m) {
      return table[m];
    });
    $.openLink(l);
  },
});

$.register({
  rule: {
    host: /^(www\.)?safelinkreview\.com$/,
    path: /^\/\w+\/cost\/([\w\.]+)\/?$/,
  },
  start: function (m) {
    'use strict';

    var l = 'http://' + m.path[1];
    $.openLink(l);
  },
});

$.register({
  rule: {
    host: [
      /^designinghomey\.com$/,
      /^motonews\.club$/,
    ],
    query: /get=([^&]+)/,
  },
  ready: function (m) {
    'use strict';

    var s = $.searchScripts(/var a='([^']+)'/);
    if (s) {
      $.openLink(s[1]);
      return;
    }
    s = atob(m.query[1]);
    $.openLink(s);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
