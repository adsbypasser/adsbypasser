_.register({
  rule: {
    host: /^bluemediafiles\.com$/,
    path: /^\/creatinglinks/,
  },
  async ready () {
    const b = $.searchFromScripts(/FinishMessage = '<a href="([^"]+)" >/);
    await $.openLink(b[1]);
  },
});
