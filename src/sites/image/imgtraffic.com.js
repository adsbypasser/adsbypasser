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
