/**
 * @domain giphy.com
 */
_.register({
  rule: {
    host: /^giphy\.com$/,
  },
  async ready() {
    const i = $('meta[property="og:image"]');
    await $.openLink(i.content);
  },
});
_.register({
  rule: {
    host: /^media[0-9]\.giphy\.com$/,
  },
  async ready() {
    const img = $("a img.media_gif__MBeQG");
    await $.openImage(img.src);
  },
});
