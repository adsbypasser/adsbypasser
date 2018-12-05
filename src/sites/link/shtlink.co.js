_.register({
  rule: {
    host: /^shtlink\.co$/,
    path: /^\/short-url\//,
  },
  async ready () {
    const meta = $('meta[name="description"]');
    const url = meta.content;
    await $.openLink(url);
  },
});
