_.register({
  rule: {
    host: /^(www\.)?link\.im$/,
    path: /^\/\w+$/,
  },
  async start () {
    const text = await $.post(document.location.href, {
      image: 'Continue',
    });
    const m = text.match(/window\.location\.replace\('([^']+)'\)/);
    await $.openLink(m[1]);
  },
});
