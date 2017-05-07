_.register({
  rule: {
    host: /^clk\.im$/,
  },
  async ready () {
    $.remove('iframe');
    const matches = $.searchFromScripts(/\$\("\.countdown"\)\.attr\("href","([^"]+)"\)/);
    await $.openLink(matches[1]);
  },
});
