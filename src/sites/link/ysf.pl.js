_.register({
  rule: {
    host: /^ysf\.pl$/,
    path: /^\/3\/(.+)$/,
  },
  async start (m) {
    const url = atob(m.path[1]);
    await $.openLink(url);
  },
});

_.register({
  rule: {
    host: /^ysf\.pl$/,
    path: /^\/2\/(.+)$/,
  },
  async start (m) {
    const url = m.path[1].match(/.{2}/g).map((h) => {
      return String.fromCharCode(parseInt(h, 16));
    }).join('');
    await $.openLink(url);
  },
});
