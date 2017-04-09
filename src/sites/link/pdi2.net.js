_.register({
  rule: {
    host: /^pdi2\.net$/,
  },
  async ready () {
    let s = $.searchFromScripts(/top\.location = '([^']+)'/);
    s = s[1];
    await $.openLink(s);
  },
});
