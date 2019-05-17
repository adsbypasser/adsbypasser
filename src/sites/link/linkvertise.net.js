// domains of linkvertise.net

_.register({
  rule: {
    host: /^(direct-link|link-to)\.net$/,
  },
  async ready () {
    const lv = $.searchFromScripts(/window.location.href = \("([^"]+)"\);/);
    await $.openLink(lv[1]);
  },
});
