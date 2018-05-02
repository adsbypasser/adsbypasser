_.register({
  rule: {
    host: /^imgprime\.com$/,
    path: /^\/imga-u\/(.+)\.jpeg\.html/,
  },
  async ready () {
    const path = window.location.href.replace('/imga-u', '/u').replace('.html', '');
    await $.openLink(path);
  },
});
