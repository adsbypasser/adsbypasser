_.register({
  rule: {
    host: /^plantaheim\.web\.id$/,
  },
  async ready () {
    const a = $.searchFromScripts(/base64_decode\("([^"]+)"/);
    const url = atob(a[1]);
    await $.openLink(url);
  },
});
