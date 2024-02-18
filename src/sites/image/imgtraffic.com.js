_.register({
  rule: {
    host: /^imgtraffic\.com$/,
    path: /^\/a-1\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/a-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^imgtraffic\.com$/,
    path: /^\/i-1\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/i-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^imgtraffic\.com$/,
    path: /^\/n-1\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/n-', '/').replace('.html', '');
    await $.openLink(path);
  },
});

_.register({
  rule: {
    host: /^imgtraffic\.com$/,
    path: /^\/z-1\/(.+)\.jpeg\.html/,
  },
  async start () {
    const path = window.location.href.replace('/z-', '/').replace('.html', '');
    await $.openLink(path);
  },
});
