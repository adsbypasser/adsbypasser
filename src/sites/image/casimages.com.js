/**
 * @domain casimages.com
 */
_.register({
  rule: {
    host: /^www\.casimages\.com$/,
  },
  async ready() {
    const img = $("div.logo a img");
    await $.openImage(img.src);
  },
});
