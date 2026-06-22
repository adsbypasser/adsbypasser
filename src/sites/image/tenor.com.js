/**
 * @domain tenor.com
 */
_.register({
  rule: {
    host: /^tenor\.com$/,
  },
  async ready() {
    const img = $('meta[property="og:url"]');
    await $.openImage(img.content);
  },
});
_.register({
  rule: {
    host: /^media1\.tenor\.com$/,
  },
  async ready() {
    const i = $('a#media-link.file img');
    await $.openLink(i.src);
  },
});
