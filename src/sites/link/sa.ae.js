_.register({
  rule: {
    host: /^(www\.)?sa\.ae$/,
    path: /^\/\w+\/$/,
  },
  async ready () {
    const m = $.searchFromScripts(/const real_link = '([^']+)';/);
    await $.openLink(m[1]);
  },
});
