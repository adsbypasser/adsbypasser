/**
 * @domain im.ge
 */
_.register({
  rule: {
    host: /^im\.ge$/,
    path: /^\/i\//,
  },
  async ready() {
    const i = $('meta[property="og:image"]');
    await $.openImage(i.content);
  },
});
