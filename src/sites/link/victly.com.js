_.register({
  rule: {
    host: /^(www\.)?victly\.com$/,
    path: /^\/\w+$/,
  },
  async start () {
    const text = await $.post(document.location.href, {
      hidden: '',
      image: 'Skip+Ads',
    });
    const m = text.match(/window\.location\.replace\('([^']+)'\)/);
    await $.openLink(m[1]);
  },
});
