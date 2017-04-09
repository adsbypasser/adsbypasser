_.register({
  rule: {
    host: /^looy\.in$/,
    path: /^\/Pro\/(.+)$/,
  },
  async ready (m) {
    const url = await $.post('http://looy.in/Go/Index/ProSkipAd', {
      code: m.path[1],
      server: '',
    });
    await $.openLink(url);
  },
});

_.register({
  rule: {
    host: /^looy\.in$/,
    path: /^\/(.+)$/,
  },
  async start (m) {
    await $.openLink('/Pro/' + m.path[1]);
  },
});
