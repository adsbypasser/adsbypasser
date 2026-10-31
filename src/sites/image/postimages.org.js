/**
 * @domain postimages.org
 * @domain postimg.cc
 */
_.register({
  rule: {
    host: [/^postimages\.org$/, /^postimg\.cc$/],
  },
  async ready() {
    const ele = $("#download");
    const img = ele.href.replace("?dl=1", "");
    await $.openImage(img, { referer: true });
  },
});
