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
      path: /^\/[np]\.php$/,
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
        /^ww[23]\.picnictrans\.com$/,
        /^gadget13\.com$/,
        /^azhie\.net$/,
        /^ww2\.awsubs\.co$/,
        /^autorp\.us$/
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
    // blogspot, kind of brutal
    {
      host: /\.blogspot\.com?/,
      query: [
        // id must be the first captured group
        /^\?url=([a-zA-Z0-9\/=]+)$/,
        /^\?id=([a-zA-Z0-9\/=]+)$/,
      ],
    },
    {
      host: /^sehatlega\.com$/,
      query: /^\?lanjut=([a-zA-Z0-9\/=]+)$/,
    },
    {
      host: /^shorten\.id$/,
      // note the trailing `=`
      query: /^\?url=([a-zA-Z0-9\/=]+)=$/,
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
        // safelinkconverter.com
        // safelinkconverter2.com
        // link.safelinkconverter.com
        // decrypt.safelinkconverter.com
        /(^|\.)safelinkconverter2?\.com$/,
        // safelinkreview.com
        // safelinksreview.com
        // safelinkreviewer.com
        // safelinkreview.co
        /^safelink(s?review(er)?)\.com?$/,
        /^susutin\.com$/,
        /^(getcomics|miuitutorial)\.gq$/,
        /^awsubs\.cf$/,
        /^awsubsco\.ga$/,
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
        /^telolet\.in$/,
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
      /^(autofans|landscapenature)\.pw$/,
      /^ani-share\.com$/,
      /^sinopsisfilmku\.com$/,
      /^(sidespace|erogedownload)\.net$/,
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

$.register({
  rule: {
    host: /^kombatch\.loncat\.pw$/,
  },
  ready: function () {
    'use strict';

    var s = $.searchScripts(/\.open\("([^"]+)",/);
    s = s[1].match(/go=([^&]+)/);
    s = atob(s[1]);
    $.openLink(s);
  },
});

$.register({
  rule: {
    host: [
      /^ww[23]\.picnictrans\.com$/,
      /^short\.awsubs\.co$/,
    ],
  },
  ready: function () {
    'use strict';

    var a = $('div.kiri > center > a');
    $.openLink(a.href);
  },
});
