/**
 * @domain earnlink.io
 */
_.register({
  rule: {
    host: /^earnlink\.io$/,
  },
  async ready() {
    const directUrl = $.searchFromScripts(/"([^"]+)"\)\.html\("Continue"\)/);
    await $.openLink(directUrl[1]);
  },
});
