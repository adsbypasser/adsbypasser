_.register({
  rule: {
    host: /^sub2unlock\.com$/,
    path: /^\/link\/get\//,
  },
  async ready () {
    const su = $('a#link.unlock-step-link.getlink');
    await $.openLink(su.href);
  },
});

_.register({
  rule: {
    host: /^sub2unlock\.com$/,
    path: /^\/[a-zA-Z0-9]+/,
  },
  async ready () {
    const su = $.searchFromScripts(/'href', '([^']+)'/);
    await $.openLink(su[1]);
  },
});
