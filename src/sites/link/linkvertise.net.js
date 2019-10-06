// domains of linkvertise.net

_.register({
  rule: {
    host: /^link-to\.net$/,
    query: /^\?r=([a-zA-Z0-9/=]+)$/,
  },
  async start (m) {
    const url = atob(m.query[1]);
    await $.openLink(url);
  },
});

_.register({
  rule: {
    host: /^direct-link\.net$/,
  },
  async ready () {
    const lv = $.searchFromScripts(/window.location.href = \("([^"]+)"\);/);
    await $.openLink(lv[1]);
  },
});
