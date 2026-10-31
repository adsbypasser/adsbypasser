/**
 * @domain postimg.cc
 * @domain postimages.org
 */
_.register({
  rule: {
    host: [/^postimg\.cc$/, /^postimages\.org$/],
  },
  async ready() {
    const ele = $("#download");
    const img = ele.href.replace("?dl=1", "");
    await $.openImage(img, { referer: true });
  },
});
