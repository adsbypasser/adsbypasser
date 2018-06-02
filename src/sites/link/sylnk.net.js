// all blog type belong here?

_.register({
  rule: [
    {
      host: [
        /^(www\.)?sylnk\.net$/,
      ],
      query: /link=([^&]+)/,
    },
    {
      host: /^(www\.)?compul\.in$/,
      path: /^\/[np]\.php$/,
      query: /v=([^&]+)/,
    },
    {
      host: [
        /^(sports14|motosport)\.pw$/,
        /^lindung\.in$/,
        /^motonews\.club$/,
        /^ww[23]\.picnictrans\.com$/,
        /^(azhie|skinnycat)\.net$/,
        /^ww2\.awsubs\.co$/,
        /^plantaheim\.web\.id$/,
      ],
      query: /^\?d=([a-zA-Z0-9/=]+)$/,
    },
    {
      host: /^i\.gtaind\.com$/,
      query: /^\?([a-zA-Z0-9/=]+)$/,
    },
    // blogspot, kind of brutal
    {
      host: [
        /\.blogspot\.com?/,
        /^simaholina\.xyz$/,
        /^(www\.)?id-securelink\.xyz$/,
        /^(www\.)?tojros\.tk$/,
        /^(www\.)?designmyhomee\.com$/,
        /^(www\.)?anjay\.info$/,
      ],
      query: [
        // id must be the first captured group
        /^\?url=([a-zA-Z0-9/=]+)$/,
        /^\?id=([a-zA-Z0-9/=]+)$/,
      ],
    },
    {
      host: [
        /^sehatlega\.com$/,
        /^businessforyouand\.me$/,
      ],
      query: /^\?r=([a-zA-Z0-9/=]+)$/,
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
      ],
      query: /id=([\w\\]+=*)/,
    },
    {
      host: [
        /^(naisho|filmku|henpoi)\.lompat\.in$/,
        /^edogawa\.lon\.pw$/,
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
  rule: {
    host: /^(gameinfo|apasih)\.pw$/,
    query: /^\?id=([a-zA-Z0-9/=]+)$/,
  },
  async ready () {
    const f = $('form');
    f.submit();
  },
});

_.register({
  rule: [
    {
      host: [
        /^(ani-share|autolinkach)\.com$/,
        /^motonews\.club$/,
        /^(autofans|landscapenature)\.pw$/,
        /^www\.lifesurance\.info$/,
      ],
      query: /get=([^&]+)/,
    },
    {
      host: /^(gameinfo|apasih)\.pw$/,
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
