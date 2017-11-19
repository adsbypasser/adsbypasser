_.register({
  rule: {
    host: [
      /^(www\.)?shink\.(in|me)$/,
      /^fas\.li$/,
      /^(www\.)?croco\.(me|site)$/,
      /^cpmlink\.net$/,
    ],
    path: /^\/\w+$/,
  },
  async ready () {
    const f = $('#skip');

    if (!$.$('#captcha')) {
      // No captcha, we can redirect straight away
      f.submit();
    }

    // Remove the popup trigger area.
    // NOTE The site will add the node back immediately, so maybe it will
    // becomes very busy.
    $.remove('.BJPPopAdsOverlay');
    $.block((node) => {
      return node.localName === 'div' && node.style.zIndex === '2147483647';
    }, document.body);
  },
});

_.register({
  rule: [
    {
      host: [
        /^cpmlink\.net$/,
      ],
      path: /^\/go\/\w+$/,
    },
    {
      host: /^(www\.)?croco\.(me|site)$/,
      path: /^\/ok\/\w+$/,
    },
  ],
  async ready () {
    let a = $('#btn-main');
    const i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    await $.openLink(a);
  },
});

_.register({
  rule: {
    host: [
      /^fas\.li$/,
      /^(www\.)?shink\.(in|me)$/,
    ],
    path: /^\/go\/\w+$/,
  },
  async ready () {
    const f = $('#skip');
    f.submit();
  },
});
