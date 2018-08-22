// all blog type belong here?

_.register({
  rule: [
    {
      host: /^(www\.)?sylnk\.net$/,
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
        // com
        /\.blogspot\.com?/,
        /^(www\.)?designmyhomee\.com$/,
        /^(www\.)?losstor\.com$/,
        /^kurosafe\.menantisenja\.com$/,
        // xyz
        /^(simaholina|autech)\.xyz$/,
        /^(www\.)?id-securelink\.xyz$/,
        /^(www\.)?converthinks\.xyz$/,
        // else
        /^(www\.)?tojros\.tk$/,
        /^(www\.)?anjay\.info$/,
        /^(www\.)?kakkoiisafe\.us$/,
        /^(www\.)?kurosafe\.(website|online)$/,
      ],
      query: [
        // id must be the first captured group
        /^\?url=([a-zA-Z0-9/=]+)$/,
        /^\?id=([a-zA-Z0-9/=]+)$/,
        /^\?site=([a-zA-Z0-9/=]+)$/,
      ],
    },
    {
      host: [
        /^sehatlega\.com$/,
        /^businessforyouand\.me$/,
        /^plantaheim\.web\.id$/,
        /^davinsurance\.com$/,
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
    host: [
      /^(gameinfo|apasih)\.pw$/,
      /^(www\.)?lifesurance\.info$/,
      /^(intercelestial|sweetlantern)\.com$/,
      /^awcar\.icu$/,
      /^getinfos\.net$/,
    ],
    query: /^\?id=([a-zA-Z0-9/=]+)$/,
  },
  async ready () {
    const f = $('form');
    f.submit();
  },
});

_.register({
  rule: {
    host: [
      /^linkach\.com$/,
    ],
    query: /^\?id=([a-zA-Z0-9/=]+)$/,
  },
  async ready () {
    const g = $('.humancheck form');
    g.submit();
  },
});

_.register({
  rule: [
    {
      host: [
        // club
        /^motonews\.club$/,
        /^(www\.)?bolaoke\.club$/,
        // else
        /^(ani-share|autolinkach)\.com$/,
        /^sehatsegar\.net$/,
        /^(autofans|landscapenature)\.pw$/,
        /^(www\.)?lifesurance\.info$/,
      ],
      query: /get=([^&]+)/,
    },
    {
      host: [
        /^(gameinfo|apasih)\.pw$/,
        /^(www\.)?lifesurance\.info$/,
        /^(intercelestial|sweetlantern|linkach)\.com$/,
        /^awcar\.icu$/,
        /^getinfos\.net$/,
      ],
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
    host: [
      // info
      /^(www\.)?anjay\.info$/,
      /^(www\.)?tetew\.info$/,
      // else
      /^www\.njiir\.com$/,
    ],
  },
  async ready () {
    let a = $('div.download-link > a');
    a = a.href.match(/r=(.*)$/);
    a = atob(a[1]);
    await $.openLink(a);
  },
});
