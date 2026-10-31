/**
 * @domain ibb.co
 * @domain imgbb.com
 */
_.register({
  rule: {
    host: [/^ibb\.co$/, /^imgbb\.com$/],
  },
  async ready() {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
