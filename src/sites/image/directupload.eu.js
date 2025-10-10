/**
 * @domain directupload.eu
 * @domain noelshack.com
 */
_.register({
  rule: {
    host: [/^www\.directupload\.eu$/, /^www\.noelshack\.com$/],
  },
  async ready() {
    const i = $('meta[property="og:image"]');
    await $.openImage(i.content);
  },
});
