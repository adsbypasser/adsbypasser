_.register({
  rule: {
    host: [
      /(^|\.)urlcash\.(com|net|org)$/,
      /^(bat5|detonating|celebclk|eightteen|smilinglinks|peekatmygirlfriend|pornyhost|clb1|urlgalleries)\.com$/,
      /^looble\.net$/,
      /^xxxs\.org$/,
    ],
  },
  async ready () {
    if ($.window && $.window.linkDestUrl) {
      await $.openLink($.window.linkDestUrl);
      return;
    }

    const matches = document.body.innerHTML.match(/linkDestUrl = '(.+)'/);
    if (matches) {
      await $.openLink(matches[1]);
      return;
    }
  },
});
