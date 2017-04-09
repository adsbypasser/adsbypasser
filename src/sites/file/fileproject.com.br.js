_.register({
  rule: {
    host: /^www\.fileproject\.com\.br$/,
    path: /^\/files\/+/,
  },
  async ready () {
    const m = $.searchFromScripts(/<a id="down" href="([^"]+)">/);
    await $.openLink(m[1]);
  },
});
