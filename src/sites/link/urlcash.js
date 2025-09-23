/**
 * @domain detonating.com
 * @domain urlcash.com
 * @domain urlgalleries.com
 * @domain xxxs.org
 */
_.register({
  rule: {
    host: [
      /^(detonating|urlgalleries)\.com$/,
      /(^|\.)urlcash\.com$/,
      /^xxxs\.org$/,
    ],
  },
  async ready() {
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
