_.register({
  rule: {
    host: [
      /(^|\.)urlcash\.(com|org)$/,
      /^(detonating|smilinglinks|pornyhost|urlgalleries)\.com$/,
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
