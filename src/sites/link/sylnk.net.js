// all blog type belong here?

_.register({
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
      query: /(?:\?|&)link=([a-zA-Z0-9/=]+)(?:$|&)/,
    },
    {
      host: [
        /^link\.filmku\.net$/,
        /^www\.healthygress24\.ga$/,
        /^kombatch\.amankan\.link$/,
      ],
      path: /^\/p\/(go|healty-lie)\.html$/,
      query: /^\?url=([a-zA-Z0-9/=]+)$/,
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
        /^autorp\.us$/,
        /^plantaheim\.web\.id$/,
      ],
      query: /^\?d=([a-zA-Z0-9/=]+)$/,
    },
    {
      host: /^www\.anisubsia\.tk$/,
      path: /^\/p\/link\.html$/,
      query: /^\?url=([a-zA-Z0-9/=]+)$/,
    },
    {
      host: [
        /^www\.insurance1\.tech$/,
        /^www\.freeanimeonline\.xyz$/,
      ],
      query: /^\?site=([a-zA-Z0-9/=]+)/,
    },
    {
      host: /^i\.gtaind\.com$/,
      query: /^\?([a-zA-Z0-9/=]+)$/,
    },
    // blogspot, kind of brutal
    {
      host: /\.blogspot\.com?/,
      query: [
        // id must be the first captured group
        /^\?url=([a-zA-Z0-9/=]+)$/,
        /^\?id=([a-zA-Z0-9/=]+)$/,
      ],
    },
    {
      host: /^sehatlega\.com$/,
      query: /^\?lanjut=([a-zA-Z0-9/=]+)$/,
    },
    {
      host: /^shorten\.id$/,
      // note the trailing `=`
      query: /^\?url=([a-zA-Z0-9/=]+)=$/,
    },
    {
      host: /^www\.compartiendofull\.net$/,
      path: /^\/go2/,
      query: /^\?p=([a-zA-Z0-9/=]+)$/,
    },
    {
      host: /^animeforce\.stream$/,
      query: /^\?l=([a-zA-Z0-9/=]+)$/,
    },
  ],
  async start (m) {
    const rawLink = atob(m.query[1]);
    await $.openLink(rawLink);
  },
});

_.register({
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
        /^(getcomics|miuitutorial)\.gq$/,
        /^awsubs\.cf$/,
        /^awsubsco\.ga$/,
      ],
      query: /id=([\w\\]+=*)/,
    },
    {
      host: [
        /^(www\.)?dlneko\.com$/,
        /^(satuasia|tawaku)\.com$/,
        /^ww3\.manteb\.in$/,
        /^link\.filmku\.net$/,
        /^www\.muucih\.com$/,
        /^(naisho|filmku|henpoi)\.lompat\.in$/,
        /^edogawa\.lon\.pw$/,
        /^telolet\.in$/,
      ],
      query: /go=([\w\\]+=*)/,
    },
  ],
  async start (m) {
    let l = atob(m.query[1]);
    const table = {
      '!': 'a',
      ')': 'e',
      '_': 'i',
      '(': 'o',
      '*': 'u',
    };
    l = l.replace(/[!)_(*]/g, function (m) {
      return table[m];
    });
    await $.openLink(l);
  },
});

_.register({
  rule: {
    host: /^(www\.)?safelinkreview\.com$/,
    path: /^\/\w+\/cost\/([\w.]+)\/?$/,
  },
  async start (m) {
    const l = 'http://' + m.path[1];
    await $.openLink(l);
  },
});

_.register({
  rule: [
    {
      host: [
        /^(designinghomey|ani-share|sinopsisfilmku|autolinkach)\.com$/,
        /^motonews\.club$/,
        /^(autofans|landscapenature|apasih|gameinfo)\.pw$/,
        /^(sidespace|erogedownload)\.net$/,
        /^otoviral\.racing$/,
        /^www\.lifesurance\.info$/,
      ],
      query: /get=([^&]+)/,
    },
    {
      host: /^sipkur\.us$/,
      path: /\.html$/,
    },
  ],
  async ready (m) {
    let s = $.searchFromScripts(/(const|var) a='([^']+)'/);
    if (s) {
      await $.openLink(s[2]);
      return;
    }
    s = atob(m.query[1]);
    await $.openLink(s);
  },
});

_.register({
  rule: {
    host: /^kombatch\.loncat\.pw$/,
  },
  async ready () {
    let s = $.searchFromScripts(/\.open\("([^"]+)",/);
    s = s[1].match(/go=([^&]+)/);
    s = atob(s[1]);
    await $.openLink(s);
  },
});

_.register({
  rule: {
    host: [
      /^ww[23]\.picnictrans\.com$/,
      /^short\.awsubs\.(co|me)$/,
    ],
  },
  async ready () {
    const a = $('div.kiri > center > a');
    await $.openLink(a.href);
  },
});

_.register({
  rule: {
    host: /^aw-games\.net$/,
  },
  async ready () {
    const a = $('.iklan a');
    await $.openLink(a.href);
  }
});

_.register({
  rule: {
    host: /^susutinv2\.com$/,
  },
  async ready () {
    const s = $.searchFromScripts(/="([^"]+)",/);
    if (!s) {
      _.warn('site changed');
      return;
    }
    await $.openLink(s[1]);
  },
});

_.register({
  rule: {
    host: /^www\.njiir\.com$/,
  },
  async ready () {
    let a = $('div.download-link > a');
    a = a.href.match(/r=(.*)$/);
    a = atob(a[1]);
    await $.openLink(a);
  },
});
