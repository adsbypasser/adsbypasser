_.register({
  rule: {
    host: /^u\.to$/,
    path: /^\/[\w-]+/,
  },
  async ready () {
    const u = $.searchFromScripts(/window.location='([^']+)';/);
    await $.openLink(u[1]);
  },
});
