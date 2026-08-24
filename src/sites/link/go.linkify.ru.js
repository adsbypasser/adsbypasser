/**
 * @domain go.linkify.ru
 */
_.register({
  rule: {
    host: /^go\.linkify\.ru$/,
  },
  async ready() {
    const url = $.searchFromScripts(/https:\/\/go\.linkify\.ru\/get\/[^"]+/)?.[0];
    await $.openLink(url);
  },
});
