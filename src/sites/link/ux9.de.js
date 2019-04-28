_.register({
  rule: {
    host: /^ux9\.de$/,
  },
  async ready () {
    const meta = $('meta[http-equiv="refresh"][content*="url="]');
    const url = meta.getAttribute('content').match(/http.*/)[0];
    await $.openLink(url);
  },
});
