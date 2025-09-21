/**
 * @domain detonating.com
 * @domain looble.net
 * @domain smilinglinks.com
 * @domain urlcash.com
 * @domain urlcash.org
 * @domain urlgalleries.com
 * @domain xxxs.org
 */
_.register({
  rule: {
    host: [
      /(^|\.)urlcash\.(com|org)$/,
      /^(detonating|smilinglinks|urlgalleries)\.com$/,
      /^looble\.net$/,
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
